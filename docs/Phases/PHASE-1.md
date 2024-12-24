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

     ```
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

  5. **Configure Connection String:** In your appsettings.json file, add the connection string for your PostgreSQL database (either a local development instance or one on Render.com).

- 1. **Task 1.3: Setting up the Database (Migrations) and Seeding Team Data**

     - 

     - **Why we're doing this:** We need to create the database structure and populate the Teams table with initial data. This data is relatively static, so seeding is appropriate.

     - **Instructions:**

       1. 

       2. **Add Initial Migration:** Open the Package Manager Console or the .NET CLI and run the command Add-Migration InitialCreate.

       3. **Modify the DbContext for Seeding:** In your ApplicationDbContext.cs file, override the OnModelCreating method to seed the Teams table. You'll need to manually create Team objects with the necessary data (name, abbreviation, ESPN Team ID, icon URL). You can find this static team data online or from an existing sports API source.

       4. **Example Code (ApplicationDbContext.cs):**

          ```
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

       5. **Apply Migrations:** Run the command Update-Database. This will create the tables and seed the Teams data.

**Task 1.4: Integrating Auth0 for Authentication**

- **Why we're doing this:** Authentication is essential to identify users and secure our application. Auth0 is a service that simplifies this process.

- **Instructions:**

  1. **Sign Up for Auth0:** Create an account on the Auth0 website.

  2. **Create an Application:** In Auth0, create a new application of type "Regular Web Application".

  3. **Configure Auth0:** Note down your Domain, Client ID, and Client Secret from the Auth0 application settings. You'll need these in your backend and frontend.

  4. **Install Auth0 Packages:** In your backend project, install the Microsoft.AspNetCore.Authentication.JwtBearer NuGet package.

  5. **Configure Authentication in Startup.cs:** In the ConfigureServices method of your Startup.cs file, add the necessary code to configure JWT authentication using your Auth0 credentials. You'll need to validate the JWT tokens issued by Auth0.

  6. **Example Code (Startup.cs):**

     ```
     public void ConfigureServices(IServiceCollection services)
     {
         // ... other services ...
         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.Authority = $"https://{Configuration["Auth0:Domain"]}/";
                 options.Audience = Configuration["Auth0:Audience"];
             });
         // ...
     }
     
     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
     {
         // ...
         app.UseAuthentication();
         app.UseAuthorization();
         // ...
     }
     ```

     content_copydownload

     Use code [with caution](https://support.google.com/legal/answer/13505487).C#

  7. **Secure API Endpoints:** Use the [Authorize] attribute on your controllers or specific actions that require authentication.

**Task 1.5: Setting up the Frontend Project (React)**

- **Why we're doing this:** The frontend is what users will see and interact with. React is a popular library for building user interfaces.
- **Instructions:**
  1. **Create a New React App:** Use create-react-app or your preferred method to create a new React project. Name it something like picus-frontend.
  2. **Install Dependencies:** Install the auth0-react SDK and axios (for making API calls). Also install shadcn-ui and its dependencies as per its documentation.
  3. **Basic Structure:** Familiarize yourself with the basic structure of a React app (e.g., src folder, App.js, index.js).

**Task 1.6: Integrating Auth0 in the Frontend**



- **Why we're doing this:** Allows users to log in and securely interact with the backend.

- **Instructions:**

  1. **Install Auth0 React SDK:** Make sure you have auth0-react installed.

  2. **Wrap Your App with Auth0Provider:** In your index.js file, wrap your App component with the Auth0Provider component, providing your Auth0 Domain and Client ID.

  3. **Example Code (index.js):**

     ```
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

**Task 1.7: Integrating with the ESPN API to Fetch Game Data**

- **Why we're doing this:** This is crucial to get the actual schedule of NFL games into our application.

- **Instructions:**

  1. **Identify the ESPN API Endpoint:** Research and identify the correct ESPN API endpoint to retrieve NFL game schedules. ESPN has various APIs, so ensure you find the one that suits your needs. Look for documentation on sports APIs or specifically the ESPN API.

  2. **Create a GameDataService:** In your backend Services folder, create a GameDataService. This service will be responsible for communicating with the ESPN API.

  3. **Install HttpClient:** You'll use HttpClient to make HTTP requests to the ESPN API. This is built into .NET.

  4. **Implement Fetching Logic:** In the GameDataService, implement a method (e.g., FetchGamesFromEspnApi) to:

     - Create an HttpClient instance.
     - Make a GET request to the ESPN API endpoint.
     - Handle potential errors during the API call (e.g., network issues, API errors).
     - Deserialize the JSON response from the ESPN API. You'll likely need to create C# classes that match the structure of the ESPN API response to deserialize into.

  5. **Map ESPN Data to Our Game Model:** Create logic within the FetchGamesFromEspnApi method (or a separate helper method) to map the data from the ESPN API response to your Game entity model. Pay attention to data type conversions and potential differences in field names. You'll need to retrieve the Team IDs from your database based on the team names or IDs provided by the ESPN API.

  6. **Example Code (GameDataService.cs - simplified):**

     ```
     using System.Net.Http;
     using System.Text.Json;
     using System.Threading.Tasks;
     using Microsoft.EntityFrameworkCore;
     
     public class GameDataService
     {
         private readonly HttpClient _httpClient;
         private readonly ApplicationDbContext _context;
     
         public GameDataService(HttpClient httpClient, ApplicationDbContext context)
         {
             _httpClient = httpClient;
             _context = context;
         }
     
         public async Task<List<Game>> FetchGamesFromEspnApi()
         {
             // Replace with the actual ESPN API endpoint
             string apiUrl = "https://api.example-espn.com/nfl/scoreboard";
     
             try
             {
                 var response = await _httpClient.GetAsync(apiUrl);
                 response.EnsureSuccessStatusCode(); // Throw exception if not successful
     
                 var json = await response.Content.ReadAsStringAsync();
     
                 // Assuming you create a class 'EspnScoreboardResponse' to match the API structure
                 var espnResponse = JsonSerializer.Deserialize<EspnScoreboardResponse>(json);
     
                 if (espnResponse?.Events != null)
                 {
                     var games = new List<Game>();
                     foreach (var espnEvent in espnResponse.Events)
                     {
                         // Map ESPN data to your Game model
                         var homeTeam = await _context.Teams.FirstOrDefaultAsync(t => t.Name == espnEvent.Competitions[0].Competitors.FirstOrDefault(c => c.HomeAway == "home")?.Team.Name);
                         var awayTeam = await _context.Teams.FirstOrDefaultAsync(t => t.Name == espnEvent.Competitions[0].Competitors.FirstOrDefault(c => c.HomeAway == "away")?.Team.Name);
     
                         if (homeTeam != null && awayTeam != null)
                         {
                             games.Add(new Game
                             {
                                 ESPNGameId = espnEvent.Id,
                                 HomeTeamId = homeTeam.Id,
                                 AwayTeamId = awayTeam.Id,
                                 GameTime = DateTime.Parse(espnEvent.Date), // You might need to adjust the parsing
                                 PickDeadline = DateTime.Parse(espnEvent.Date).AddHours(-1) // Example deadline
                                 // ... map other properties ...
                             });
                         }
                     }
                     return games;
                 }
                 return new List<Game>();
             }
             catch (HttpRequestException ex)
             {
                 // Log the error
                 return null;
             }
             catch (JsonException ex)
             {
                 // Log the error
                 return null;
             }
         }
     }
     ```

     content_copydownload

     Use code [with caution](https://support.google.com/legal/answer/13505487).C#

  7. **Register HttpClient and GameDataService:** In your Startup.cs, register HttpClient as a service and your GameDataService.

  8. **Periodically Sync Games (Initial Implementation):** For this initial phase, you can implement a simple way to trigger the ESPN API sync. This could be:

     - 
     - **A manual action in a controller:** Create an API endpoint that, when called, executes the FetchGamesFromEspnApi method and saves the new games to the database. This is good for initial setup and testing.
     - **A scheduled task (more robust):** Use a library like Hangfire or implement a simple BackgroundService to periodically call the FetchGamesFromEspnApi method. This is a better long-term solution but might be slightly more complex for a junior developer initially. Start with the manual trigger if needed.

  9. **Save Games to the Database:** Once you fetch and map the game data, use your ApplicationDbContext to add the new Game entities to the database. Be mindful of potential duplicates (you can check if a game with the same ESPNGameId already exists).

- 1. **Task 1.8: Creating the Game Listing API Endpoint**

     - 

     - **Why we're doing this:** The frontend needs a way to get the list of *synced* games from our database.

     - **Instructions:**

       1. **Update GamesController and GameService:**

          - In your GameService, create a method (e.g., GetUpcomingGamesFromDatabase) to retrieve games from the database. You might want to filter these games (e.g., only upcoming games).
          - Update your GamesController's GetUpcomingGames action to use the GameService to fetch games from the *database*.

       2. **Example Code (GamesController.cs updated):**

          ```
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