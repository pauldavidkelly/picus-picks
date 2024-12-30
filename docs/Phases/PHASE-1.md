**Phase 1: Core Functionality - "The Foundation"**

**Goal:** Get the very basic plumbing working: users can register/login, the application can fetch game data, and users can submit simple money line picks.

Here's a breakdown into smaller tasks:

**Task 1.1: Setting Up the Backend Project (C# .NET Web API)**

- **Why we're doing this:** This creates the core engine of our application – where all the logic happens. The Web API will handle requests from the frontend, process data, and interact with the database.
- **Instructions:**
  1. **Create a New Project:** In your development environment (like Visual Studio or VS Code with the C# extension), create a new ASP.NET Core Web API project. Name it something like Picus.API.
  2. **Basic Structure:** Understand the basic structure of the project. You'll see folders like Controllers, Models, and potentially Services (we'll add this later).
  3. **Run the Basic Template:** Try running the default "WeatherForecast" API that comes with the template to ensure your environment is set up correctly. This confirms the project can build and run.

**Task 1.2: Defining the Database Models (Entity Framework Core)**

- **Why we're doing this:** Models represent the structure of our data in the database. Entity Framework Core (EF Core) will allow us to interact with the database using C# objects.

- **Instructions:**

  1. **Install EF Core Packages:** Add the necessary NuGet packages for EF Core (like Microsoft.EntityFrameworkCore.Design, Microsoft.EntityFrameworkCore.SqlServer or Microsoft.EntityFrameworkCore.Npgsql for PostgreSQL, and Microsoft.EntityFrameworkCore.Tools).

  2. **Create Entity Classes:** In the Models folder, create C# classes corresponding to the database tables we defined in the architecture document (e.g., User.cs, Game.cs, Pick.cs, Team.cs).

  3. **Example Code (Game.cs):**

     ```csharp
     public class Game
     {
         public int Id { get; set; }
         public string ESPNGameId { get; set; } // Unique ID from ESPN
         public int HomeTeamId { get; set; }
         public Team HomeTeam { get; set; } // Navigation property
         public int AwayTeamId { get; set; }
         public Team AwayTeam { get; set; } // Navigation property
         public DateTime GameTime { get; set; }
         public DateTime PickDeadline { get; set; }
         // ... other properties from the schema ...
     }
     ```

     content_copydownload

     Use code [with caution](https://support.google.com/legal/answer/13505487).C#

  4. **Create DbContext:** Create a class that inherits from DbContext (e.g., ApplicationDbContext.cs). This class represents your connection to the database and will contain DbSet<T> properties for each of your entity types.

  5. **Configure Connection String:** In your appsettings.json file, add the connection string for your PostgreSQL database (either a local development instance or one on Render.com). Ensure the connection string is stored in a secure way so it is not checked into the repository.

- 1. **Task 1.3: Setting up the Database (Migrations) and Seeding Team Data**

     - **Why we're doing this:** We need to create the database structure and populate the Teams table with initial data. This data is relatively static, so seeding is appropriate.

     - **Instructions:**

       1. **Add Initial Migration:** Open the Package Manager Console or the .NET CLI and run the command Add-Migration InitialCreate.

       2. **Modify the DbContext for Seeding:** In your ApplicationDbContext.cs file, override the OnModelCreating method to seed the Teams table. You'll need to manually create Team objects with the necessary data (name, abbreviation, ESPN Team ID, icon URL). You can find this static team data online or from an existing sports API source.

       3. **Example Code (ApplicationDbContext.cs):**

          ```csharp
          using Microsoft.EntityFrameworkCore;
          
          public class ApplicationDbContext : DbContext
          {
              public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
              {
              }
          
              public DbSet<User> Users { get; set; }
              public DbSet<Game> Games { get; set; }
              public DbSet<Pick> Picks { get; set; }
              public DbSet<Team> Teams { get; set; }
              public DbSet<League> Leagues { get; set; }
          
              protected override void OnModelCreating(ModelBuilder modelBuilder)
              {
                  base.OnModelCreating(modelBuilder);
          
                  modelBuilder.Entity<Team>().HasData(
                      new Team { Id = 1, ESPNTeamId = "1", Name = "Atlanta Falcons", Abbreviation = "ATL", IconUrl = "url_to_falcons_icon" },
                      new Team { Id = 2, ESPNTeamId = "2", Name = "Buffalo Bills", Abbreviation = "BUF", IconUrl = "url_to_bills_icon" },
                      // ... Add data for all NFL teams ...
                  );
              }
          }
          ```

          content_copydownload

          Use code [with caution](https://support.google.com/legal/answer/13505487).C#

       4. **Apply Migrations:** Run the command Update-Database. This will create the tables and seed the Teams data.

**Task 1.4: Integrating Auth0 for Authentication**

- **Why we're doing this:** Authentication is essential to identify users and secure our application. Auth0 is a service that simplifies this process.

- **Instructions:**

  1. **Sign Up for Auth0:** Create an account on the Auth0 website.

  2. **Create an Application:** In Auth0, create a new application of type "Regular Web Application".

  3. **Configure Auth0:** Note down your Domain, Client ID, and Client Secret from the Auth0 application settings. You'll need these in your backend and frontend.

  4. **Install Auth0 Packages:** In your backend project, install the Microsoft.AspNetCore.Authentication.JwtBearer NuGet package.

  5. **Create Auth0 Settings Class:** Create a class to hold Auth0 configuration:
     ```csharp
     public class Auth0Settings
     {
         public string Domain { get; set; } = string.Empty;
         public string Audience { get; set; } = string.Empty;
     }
     ```

  6. **Configure appsettings.json:** Add the Auth0 configuration structure to appsettings.json (without sensitive values):
     ```json
     {
       "Auth0": {
         "Domain": "",
         "Audience": ""
       }
     }
     ```

  7. **Configure appsettings.Development.json:** Add your actual Auth0 values to the development settings file (which should be in .gitignore):
     ```json
     {
       "Auth0": {
         "Domain": "your-auth0-domain.auth0.com",
         "Audience": "your-api-identifier"
       }
     }
     ```

  8. **Configure Authentication in Program.cs:** Add the necessary code to configure JWT authentication using your Auth0 credentials:
     ```csharp
     // Configure Auth0 Settings
     var auth0Settings = builder.Configuration.GetSection("Auth0").Get<Auth0Settings>();
     builder.Services.Configure<Auth0Settings>(builder.Configuration.GetSection("Auth0"));
     
     // Configure JWT Authentication
     builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
         .AddJwtBearer(options =>
         {
             options.Authority = $"https://{auth0Settings?.Domain}/";
             options.Audience = auth0Settings?.Audience;
             options.TokenValidationParameters = new TokenValidationParameters
             {
                 NameClaimType = "name",
                 RoleClaimType = "https://picus-picks/roles"
             };
         });
     ```

  9. **Configure Swagger for JWT Authentication:** Enhance Swagger configuration to support testing authenticated endpoints:
     ```csharp
     builder.Services.AddSwaggerGen(c =>
     {
         c.SwaggerDoc("v1", new OpenApiInfo { Title = "Picus Picks API", Version = "v1" });
         
         c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
         {
             Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer {token}' in the text input below.",
             Name = "Authorization",
             In = ParameterLocation.Header,
             Type = SecuritySchemeType.ApiKey,
             Scheme = "Bearer"
         });
     
         c.AddSecurityRequirement(new OpenApiSecurityRequirement
         {
             {
                 new OpenApiSecurityScheme
                 {
                     Reference = new OpenApiReference
                     {
                         Type = ReferenceType.SecurityScheme,
                         Id = "Bearer"
                     }
                 },
                 Array.Empty<string>()
             }
         });
     });
     ```

  10. **Create a Test Authentication Controller:** Create a simple controller to test the authentication:
      ```csharp
      [ApiController]
      [Route("api/[controller]")]
      public class TestAuthController : ControllerBase
      {
          [HttpGet]
          [Authorize]
          public IActionResult Get()
          {
              return Ok(new { message = "You are authenticated!" });
          }
      }
      ```

  11. **Test the Authentication:** Run the application and use Swagger UI at `/swagger` to test the authenticated endpoints.

**Task 1.5: Setting up the Frontend Project (React + Shadcn UI)**

- **Why we're doing this:** We need a modern, responsive user interface for users to interact with our application. Using React with Shadcn UI will give us a clean, professional look with pre-built components.

- **Instructions:**
  1. **Create Vite Project:** Set up a new React + TypeScript project using Vite for better performance and development experience.
     ```bash
     npm create vite@latest frontend -- --template react-ts
     ```

  2. **Install Dependencies:** Install necessary packages:
     - Auth0 React SDK for authentication
     - React Router for navigation
     - Tailwind CSS for styling
     - Shadcn UI dependencies
     ```bash
     npm install @auth0/auth0-react axios react-router-dom tailwindcss postcss autoprefixer @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
     ```

  3. **Configure Tailwind and Shadcn UI:**
     - Initialize Tailwind CSS
     - Set up the base styles and configuration
     - Create the utils.ts file for Shadcn UI utilities
     - Set up the theme configuration in tailwind.config.js

  4. **Create Basic Components:**
     - Set up the Button component from Shadcn UI
     - Create a Navbar component with authentication controls
     - Set up the basic application layout

  5. **Configure Authentication:**
     - Set up Auth0Provider in App.tsx
     - Create environment variables for Auth0 configuration
     - Implement login/logout functionality in the Navbar

  6. **Project Structure:**
     ```
     frontend/
     ├── src/
     │   ├── components/
     │   │   ├── ui/
     │   │   │   └── button.tsx
     │   │   └── Navbar.tsx
     │   ├── lib/
     │   │   └── utils.ts
     │   ├── App.tsx
     │   └── main.tsx
     ├── .env.example
     ├── tailwind.config.js
     └── package.json
     ```

**Status:** 
- Basic React application structure set up
- Authentication UI implemented
- Shadcn UI configured with initial components
- Project ready for implementing game listing and pick submission features

**Task 1.6: Integrating Auth0 in the Frontend**

- **Why we're doing this:** Allows users to log in and securely interact with the backend.

- **Instructions:**

  1. **Install Auth0 React SDK:** Make sure you have auth0-react installed.

  2. **Wrap Your App with Auth0Provider:** In your index.js file, wrap your App component with the Auth0Provider component, providing your Auth0 Domain and Client ID.

  3. **Example Code (index.js):**

     ```javascript
     import React from 'react';
     import ReactDOM from 'react-dom/client';
     import App from './App';
     import { Auth0Provider } from '@auth0/auth0-react';
     
     const root = ReactDOM.createRoot(document.getElementById('root'));
     root.render(
       <React.StrictMode>
         <Auth0Provider
           domain="YOUR_AUTH0_DOMAIN"
           clientId="YOUR_AUTH0_CLIENT_ID"
           redirectUri={window.location.origin}
         >
           <App />
         </Auth0Provider>
       </React.StrictMode>
     );
     ```

     content_copydownload

     Use code [with caution](https://support.google.com/legal/answer/13505487).JavaScript

  4. **Implement Login/Logout:** Create components or use the useAuth0 hook to implement login and logout functionality.

- 1. **Task 1.7: Integrating with TheSportsDB API to Fetch Game Data**

     **Current Implementation with TheSportsDB API**

     - **Why we're doing this:** This is crucial to get the actual schedule of NFL games into our application. We've chosen TheSportsDB API as it provides reliable NFL game data with a straightforward API structure.

     - **Instructions:**

       1. **Set up TheSportsDB API Access:**

          - Sign up for an API key at TheSportsDB.com
          - Add the API configuration to your appsettings.json:

          ```json
          {
            "SportsDbApi": {
              "Url": "https://www.thesportsdb.com/api/v1/json/[your-key]",
              "ApiKey": "[your-api-key]"
            }
          }
          ```

       2. **Create Models for TheSportsDB Response:**

          - In the Models/SportsDb folder, create the necessary model classes to match the API response structure:

          ```csharp
          public class Game
          {
              [JsonPropertyName("idEvent")]
              public string Id { get; set; } = string.Empty;
          
              [JsonPropertyName("strEvent")]
              public string Name { get; set; } = string.Empty;
          
              [JsonPropertyName("dateEvent")]
              public string Date { get; set; } = string.Empty;
          
              [JsonPropertyName("strTime")]
              public string Time { get; set; } = string.Empty;
          
              [JsonPropertyName("idHomeTeam")]
              public string HomeTeamId { get; set; } = string.Empty;
          
              [JsonPropertyName("idAwayTeam")]
              public string AwayTeamId { get; set; } = string.Empty;
          
              // Additional properties...
          }
          ```

       3. **Create ISportsDbService Interface:**

          ```csharp
          public interface ISportsDbService
          {
              Task<List<Models.SportsDb.Game>> GetLeagueScheduleAsync(int leagueId, int season);
          }
          ```

       4. **Implement SportsDbService:**

          ```csharp
          public class SportsDbService : ISportsDbService
          {
              private readonly HttpClient _httpClient;
              private readonly string _baseUrl;
          
              public SportsDbService(HttpClient httpClient, IConfiguration configuration)
              {
                  _httpClient = httpClient;
                  _baseUrl = configuration.GetSection("SportsDbApi").GetValue<string>("Url");
                  _httpClient.DefaultRequestHeaders.Add("X-API-KEY", 
                      configuration.GetSection("SportsDbApi").GetValue<string>("ApiKey"));
              }
          
              public async Task<List<Game>> GetLeagueScheduleAsync(int leagueId, int season)
              {
                  try
                  {
                      string url = $"{_baseUrl}/schedule/league/{leagueId}/{season}";
                      var response = await _httpClient.GetAsync(url);
                      response.EnsureSuccessStatusCode();
          
                      var content = await response.Content.ReadAsStringAsync();
                      var schedule = JsonSerializer.Deserialize<GameSchedule>(content, 
                          new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
          
                      return schedule?.Schedule ?? new List<Game>();
                  }
                  catch (Exception ex)
                  {
                      throw new SportsDbException("Failed to retrieve league schedule", ex);
                  }
              }
          }
          ```

       5. **Create GameMapper for Data Transformation:**

          ```csharp
          public static class GameMapper
          {
              public static Models.Game ToGameEntity(this Models.SportsDb.Game sportsDbGame)
              {
                  var gameTime = ParseGameDateTime(sportsDbGame.Date, sportsDbGame.Time);
                  var week = ParseWeek(sportsDbGame.IntRound);
                  
                  return new Models.Game
                  {
                      ExternalGameId = sportsDbGame.Id,
                      GameTime = gameTime,
                      PickDeadline = gameTime,
                      Location = sportsDbGame.StrVenue ?? string.Empty,
                      HomeTeamScore = ParseScore(sportsDbGame.HomeScore),
                      AwayTeamScore = ParseScore(sportsDbGame.AwayScore),
                      IsCompleted = sportsDbGame.HomeScore != null && sportsDbGame.AwayScore != null,
                      Week = week,
                      IsPlayoffs = DetermineIfPlayoffs(week),
                      Season = DetermineSeason(gameTime)
                  };
              }
          
              // Helper methods for parsing and data conversion...
          }
          ```

       6. **Implement Game Service for Data Synchronization:**

          ```csharp
          public class GameService : IGameService
          {
              private readonly IRepository<Game> _gameRepository;
              private readonly ISportsDbService _sportsDbService;
              private readonly PicusDbContext _dbContext;
          
              public async Task<IEnumerable<Game>> UpsertGamesForSeasonAsync(int leagueId, int season)
              {
                  var sportsDbGames = await _sportsDbService.GetLeagueScheduleAsync(leagueId, season);
                  
                  // Filter out preseason games
                  sportsDbGames = sportsDbGames.Where(g => GameMapper.ParseWeek(g.IntRound) != 500).ToList();
          
                  var upsertedGames = new List<Game>();
          
                  foreach (var sportsDbGame in sportsDbGames)
                  {
                      // Map and upsert game data...
                  }
          
                  return upsertedGames;
              }
          }
          ```

       7. **Error Handling:**

          - Create a custom exception class for TheSportsDB API errors:

          ```csharp
          public class SportsDbException : Exception
          {
              public SportsDbException(string message, Exception innerException) 
                  : base(message, innerException)
              {
              }
          }
          ```

       8. **Register Services:**
          In Program.cs or where you configure services:

          ```csharp
          builder.Services.AddHttpClient<ISportsDbService, SportsDbService>();
          builder.Services.AddScoped<IGameService, GameService>();
          ```

     **Key Features of Current Implementation:**

     1. **Robust Error Handling:** Custom exceptions and proper error propagation
     2. **Data Mapping:** Comprehensive mapping from TheSportsDB model to our domain model
     3. **Week Calculation:** Proper handling of NFL week numbers and season determination
     4. **Score Handling:** Null-safe parsing of game scores
     5. **Preseason Filtering:** Automatic filtering of preseason games
     6. **Upsert Logic:** Smart update/insert logic to handle both new games and updates

     **Testing Considerations:**

     1. Write unit tests for:
        - GameMapper functions
        - SportsDbService error handling
        - Game update/insert logic

     2. Write integration tests for:
        - TheSportsDB API communication
        - Complete game synchronization process

     3. Manual testing cases:
        - Verify correct week number calculation
        - Check proper handling of completed games
        - Validate proper timezone handling
        - Confirm proper handling of playoff games

     The implementation provides a robust foundation for fetching and maintaining NFL game data, with proper error handling and data validation throughout the process.

- 1. **Task 1.8: Creating the Game Listing API Endpoint**

     - 

     - **Why we're doing this:** The frontend needs a way to get the list of *synced* games from our database.

     - **Instructions:**

       1. **Update GamesController and GameService:**

          - In your GameService, create a method (e.g., GetUpcomingGamesFromDatabase) to retrieve games from the database. You might want to filter these games (e.g., only upcoming games).
          - Update your GamesController's GetUpcomingGames action to use the GameService to fetch games from the *database*.

       2. **Example Code (GamesController.cs updated):**

          ```csharp
          [ApiController]
          [Route("api/[controller]")]
          public class GamesController : ControllerBase
          {
              private readonly IGameService _gameService; // Use an interface for better testing
          
              public GamesController(IGameService gameService)
              {
                  _gameService = gameService;
              }
          
              [HttpGet("upcoming")]
              public async Task<ActionResult<IEnumerable<Game>>> GetUpcomingGames()
              {
                  var games = await _gameService.GetUpcomingGamesFromDatabase();
                  return Ok(games);
              }
          }
          ```

          content_copydownload

          Use code [with caution](https://support.google.com/legal/answer/13505487).C#

       3. **Create Interface for GameService:** It's good practice to use interfaces for your services to make them more testable. Create an IGameService interface.

       4. **Testing:** Write integration tests to ensure the GamesController correctly retrieves and returns game data from the database.

**Task 1.9: Displaying Games in the Frontend**

- **Why we're doing this:** So users can see the games they need to make picks for.
- **Instructions:**
  1. **Create a GameList Component:** In your React app, create a new component (e.g., GameList.js).
  2. **Fetch Games Data:** Use axios and the useEffect hook to fetch the game data from your backend API endpoint (/api/games/upcoming).
  3. **Display Games:** Render the fetched games in the component. For now, just display basic information like home team, away team, and game time. Use Shadcn components for styling.

**Task 1.10: Creating the Basic Pick Submission UI and API Endpoint**

- **Why we're doing this:** The core functionality of the app is allowing users to make picks.
- **Instructions:**
  1. **Update GameList Component:** Add UI elements to your GameList component to allow logged-in users to select a winning team for each game. This could be radio buttons or a dropdown.
  2. **Create Pick Model and PicksController:** In your backend, create the Pick model and a PicksController.
  3. **Create PickService:** Create a PickService to handle the logic of saving picks to the database.
  4. **Implement SubmitPick Action:** In the PicksController, create a HttpPost action (e.g., SubmitPick) that accepts the UserId, GameId, and SelectedTeamId. Use the PickService to save the pick. For now, don't worry about the deadline.
  5. **Frontend Submit Logic:** In your GameList component, add the logic to send the selected pick data to the backend API endpoint when a user makes a pick. You'll need to include the user's ID (which you can get from Auth0).
  6. **Testing:** Write unit tests for the PickService to verify the pick submission logic. Write integration tests for the PicksController to ensure it handles pick submissions correctly.

**Task 1.11: Basic Deployment to Render.com**

- **Why we're doing this:** To make the application accessible.
- **Instructions:**
  1. **Create Render.com Accounts:** Create accounts on Render.com.
  2. **Create Web Services:** Create two web services on Render.com – one for your backend and one for your frontend.
  3. **Connect to GitHub:** Connect your GitHub repository to your Render.com services.
  4. **Configure Build and Deploy Settings:** Follow the Render.com documentation to configure the build commands and start commands for your backend and frontend. You'll need to specify the correct environment variables (especially your database connection string and Auth0 credentials).

**Task 1.11: Basic Unit and Integration Tests**

- **Why we're doing this:** To ensure our code works correctly.
- **Instructions:**
  1. **Unit Tests for PickService:** Write unit tests to test the SubmitPick logic in your PickService. Test scenarios like saving a valid pick.
  2. **Basic Integration Tests for GamesController:** Write basic integration tests for your GamesController to ensure the GetUpcomingGames endpoint returns a successful response.

**Task 1.12: Testing the ESPN API Integration**

- **Why we're doing this:** To ensure we can successfully fetch and store game data from the external API.
- **Instructions:**
  1. **Unit Tests for GameDataService:** Write unit tests for your GameDataService. This might involve mocking the HttpClient to simulate API responses and test the data mapping logic.
  2. **Manual Testing:** After deploying (or running locally), manually trigger the ESPN API sync (if you implemented a manual trigger) and check if the Games table in your database is populated with the correct data. Examine the logs for any errors during the synchronization process.