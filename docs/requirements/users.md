# Email Access Control and User Management Guide

This guide explains how we control access to the Picus NFL Picks application and manage user records. Our system does two important things: it checks if a user's email is approved for access, and it ensures each user has a proper record in our database for tracking their picks and participation.

## How It Works

When someone tries to log in through Auth0, our system follows these steps:

1. First, it checks if their email address is on our approved list
2. If approved, it checks if we already have a record for this user in our database
3. If they're new, it creates a new user record in our database
4. Finally, it lets them access the application

This process ensures that not only can approved users log in, but they can also participate fully in the picks system.

## Database Structure

In our Users table, we store essential information about each participant:

```sql
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Auth0Id VARCHAR(128) NOT NULL UNIQUE,
    Email VARCHAR(256) NOT NULL UNIQUE,
    Username VARCHAR(100) NOT NULL,
    Role VARCHAR(20) DEFAULT 'Player',
    LeagueId INT NULL,
    Timezone VARCHAR(50) DEFAULT 'UTC',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Users_Leagues FOREIGN KEY (LeagueId) REFERENCES Leagues(Id)
);
```

## System Components

Our user management system consists of four main parts:

1. A configuration file storing approved email addresses
2. A service that validates emails against our approved list
3. A user management service that handles database operations
4. A security check that coordinates the whole process

Let's go through setting up each part.

### Step 1: Create the Configuration File

Create `allowedEmails.json` in your project's root directory:

```json
{
  "AllowedEmails": {
    "Entries": [
      "friend1@example.com",
      "friend2@example.com",
      "your@email.com"
    ]
  }
}
```

### Step 2: Create the User Management Models

First, create `UserModel.cs` in your `Models` folder:

```csharp
public class UserModel
{
    public int Id { get; set; }
    public string Auth0Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Role { get; set; } = "Player";
    public int? LeagueId { get; set; }
    public string Timezone { get; set; } = "UTC";
    public DateTime CreatedAt { get; set; }
}
```

### Step 3: Create the User Management Service

Create `UserService.cs` in your `Services` folder:

```csharp
public interface IUserService
{
    Task<UserModel> GetOrCreateUserAsync(string auth0Id, string email, string username);
    Task<UserModel> GetUserByEmailAsync(string email);
    Task<UserModel> GetUserByAuth0IdAsync(string auth0Id);
}

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(ApplicationDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UserModel> GetOrCreateUserAsync(string auth0Id, string email, string username)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Auth0Id == auth0Id);

        if (existingUser != null)
        {
            return existingUser;
        }

        _logger.LogInformation("Creating new user record for {Email}", email);

        var newUser = new UserModel
        {
            Auth0Id = auth0Id,
            Email = email,
            Username = username,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    public async Task<UserModel> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<UserModel> GetUserByAuth0IdAsync(string auth0Id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Auth0Id == auth0Id);
    }
}
```

### Step 4: Update the Email Validation Middleware

Now we'll update our middleware to handle both email validation and user creation:

```csharp
public class EmailValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IEmailValidationService _emailValidationService;
    private readonly IUserService _userService;
    private readonly ILogger<EmailValidationMiddleware> _logger;

    public EmailValidationMiddleware(
        RequestDelegate next,
        IEmailValidationService emailValidationService,
        IUserService userService,
        ILogger<EmailValidationMiddleware> logger)
    {
        _next = next;
        _emailValidationService = emailValidationService;
        _userService = userService;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var auth0Id = context.User.Claims
            .FirstOrDefault(c => c.Type == "sub")?.Value;
        var email = context.User.Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var name = context.User.Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(auth0Id))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(new { message = "Invalid authentication credentials." });
            return;
        }

        // Check if email is allowed
        if (!_emailValidationService.IsEmailAllowed(email))
        {
            _logger.LogWarning("Unauthorized access attempt from email: {Email}", email);
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new { 
                message = "This site is currently invitation-only. If you believe you should have access, please contact the administrator." 
            });
            return;
        }

        try
        {
            // Get or create user record
            var user = await _userService.GetOrCreateUserAsync(auth0Id, email, name ?? email);
            
            // Add user information to the current context for use in controllers
            context.Items["User"] = user;
            
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing user {Email}", email);
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { message = "An error occurred while processing your request." });
        }
    }
}
```

### Step 5: Register Everything in Program.cs

Update your `Program.cs` to include the new user service:

```csharp
// Add configuration
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"allowedEmails.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Register services
builder.Services.Configure<AllowedEmailsConfig>(
    builder.Configuration.GetSection("AllowedEmails"));
builder.Services.AddSingleton<IEmailValidationService, EmailValidationService>();
builder.Services.AddScoped<IUserService, UserService>();

// Add middleware
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<EmailValidationMiddleware>();
```

## Managing Users

When managing users, remember that you need to:

1. Add their email to the `allowedEmails.json` file to grant them access
2. The system will automatically create their user record in the database when they first log in
3. You can view user records in the database to track participation and manage picks

To add a new user:

1. Add their email to `allowedEmails.json`:
```json
{
  "AllowedEmails": {
    "Entries": [
      "existing@example.com",
      "newuser@example.com"    // Add the new email here
    ]
  }
}
```

2. Let them know they can now log in through the application
3. Their user record will be created automatically on first login

## Working with User Records

In your controllers, you can access the current user's information like this:

```csharp
[ApiController]
[Route("api/[controller]")]
public class PicksController : ControllerBase
{
    private readonly IUserService _userService;

    public PicksController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitPick([FromBody] PickSubmissionDto pick)
    {
        var currentUser = HttpContext.Items["User"] as UserModel;
        if (currentUser == null)
        {
            return Unauthorized();
        }

        // Use currentUser.Id for creating the pick record
        // ... rest of your pick submission logic
    }
}
```

## Troubleshooting

If users are having trouble:

1. Check that their email is in `allowedEmails.json`
2. Verify their user record exists in the database
3. Check the logs for any errors during user creation
4. Ensure they're using the same email address for Auth0 login that's in your approved list

Common issues might include:
- Emails in `allowedEmails.json` don't match the email they use for social login
- Database connection issues preventing user record creation
- Missing or incorrect Auth0 claims

## Development Tips

For local development:
1. Create an `allowedEmails.Development.json` with test emails
2. Use a local database with some test user records
3. Use Auth0's development tenant for authentication

Remember: A user needs both an approved email AND a database record to fully participate in the picks system.
