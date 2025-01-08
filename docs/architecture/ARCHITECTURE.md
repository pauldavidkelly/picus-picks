# Picus NFL Picks App - Architecture Overview

This document provides a high-level overview of the Picus NFL Picks app architecture in simple terms.

## System Overview

Picus is a self-hosted NFL picks application that allows users to make predictions about NFL games. The application consists of:

1. A C# Web API Backend: Handles all business logic, data storage, and external API communications
2. A React Frontend: Provides an intuitive user interface for making and viewing picks
3. A PostgreSQL Database: Stores all our application data

## Key Features

### Pick Management

- Users can make money line picks for upcoming games
- Picks are hidden from other users until the game deadline
- After deadline, picks are displayed in a table format:
  - Players' names as column headers
  - Games listed down the side
  - Team badges/icons showing each player's pick
- Future expansion planned for spread and over/under picks

### Dashboard

The user dashboard shows:

- Upcoming games requiring picks
- Recent pick results
- Performance statistics
- League standings

## Technology Stack

### Backend

- C# with .NET Core Web API
- Entity Framework Core for database access
- LINQ for querying data
- Auth0 for authentication

### Frontend

- React for the user interface
- Auth0 React SDK for authentication
- **Shadcn UI** for UI elements

### Database

- PostgreSQL for data storage
- Structured to support:
  - User data and authentication
  - Game schedules and results
  - Player picks and deadlines
  - League information

## Application Structure

Our application follows a simplified clean architecture with three main parts:

### 1. API Layer (Controllers)

Responsibilities:

- Handle HTTP requests
- Validate incoming data
- Route requests to appropriate services
- Format responses
- Implement global exception handling to return consistent error responses.
- Log all incoming requests and outgoing responses for debugging and monitoring.
- Implement integration tests to ensure controllers correctly interact with services.

Example Controller Structure:

```
public class PicksController : ControllerBase
{
    private readonly IPickService _pickService;

    // Handle getting picks
    [HttpGet]
    public async Task<IActionResult> GetPicks(int weekId)
    {
        try
        {
            // ... logic ...
        }
        catch (Exception ex)
        {
            // Log the error
            return StatusCode(StatusCodes.Status500InternalServerError, "Error getting picks.");
        }
    }

    // Handle submitting picks
    [HttpPost]
    public async Task<IActionResult> SubmitPicks(PickSubmissionDto picks)
    {
        // ... logic ...
    }
}
```

content_copydownload

Use code [with caution](https://support.google.com/legal/answer/13505487).C#

### 2. Service Layer

Responsibilities:

- Implement business logic
- Enforce pick deadlines
- Calculate standings
- Manage data access
- Implement unit tests for core business logic and calculations.
- Implement robust error handling within service methods, potentially throwing custom exceptions for specific scenarios.
- Log significant events and errors within service methods.

Example Service Structure:

```
public class PickService
{
    private readonly ApplicationDbContext _context;

    // Business logic for submitting picks
    public async Task<r> SubmitPicks(int userId, List<Pick> picks)
    {
        try
        {
            // Validate deadline
            // Save picks
            // Return result
        }
        catch (Exception ex)
        {
            // Log the error
            throw new PickSubmissionException("Error submitting picks.", ex);
        }
    }
}
```

content_copydownload

Use code [with caution](https://support.google.com/legal/answer/13505487).C#

### 3. Data Access Layer

Responsibilities:

- Define database structure
- Handle data operations
- Manage relationships between entities
- Implement integration tests to ensure correct interaction with the database.
- Abstract database interactions to allow for potential future changes in data storage.

Example Entity Structure:

```
public class Pick
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int GameId { get; set; }
    public int TeamId { get; set; }
    public DateTime SubmittedAt { get; set; }
}
```

content_copydownload

Use code [with caution](https://support.google.com/legal/answer/13505487).C#

### Testing Strategy

Our testing strategy will encompass three key types of tests:

- **Unit Tests:** Focused on testing individual components, particularly within the Service Layer, to ensure business logic is correct and isolated.
- **Integration Tests:** Focused on testing the interaction between different layers, such as Controllers interacting with Services and Services interacting with the Data Access Layer. This ensures that the components work correctly together.
- **End-to-End Tests:** Focused on testing the complete flow of the application, simulating user interactions from the frontend through the backend and database. This verifies the overall functionality and user experience.

## Database Schema

### Users Table

- Id (Primary Key)
- Auth0Id (for authentication)
- Username
- Role (Admin/Player)
- LeagueId
- **Timezone** (String, to store the user's preferred timezone for displaying game times)

### Games Table

- Id (Primary Key)
- ExternalGameId (String, to store the unique identifier from TheSportsDB API)
- HomeTeamId (Foreign Key)
- AwayTeamId (Foreign Key)
- GameTime (DateTime, storing the scheduled game time in UTC)
- PickDeadline (DateTime, storing the pick submission deadline in UTC)
- Week (Integer)
- Season (Integer)
- IsCompleted (Boolean)
- IsPlayoffs (Boolean)
- Location (String)
- HomeTeamScore (Integer, nullable)
- AwayTeamScore (Integer, nullable)
- WinningTeamId (Foreign Key, nullable)
- **UNIQUE (ExternalGameId)** *(Adding a constraint to prevent duplicate games)*

### Picks Table

- Id (Primary Key)
- UserId (Foreign Key)
- GameId (Foreign Key)
- SelectedTeamId (Foreign Key)
- SubmissionTime (DateTime)
- IsCorrect (Boolean)
- Points (Integer)
- **INDEX (UserId, GameId)** *(Adding an index for faster lookups)*

### Leagues Table

- Id (Primary Key)
- Name (String)
- CreatedAt (DateTime)
- AdminUserId (Foreign Key)
- **Description** (String, optional description of the league)

### Teams Table

- Id (Primary Key)
- ExternalTeamId (String, from TheSportsDB)
- Name (String)
- Abbreviation (String)
- IconUrl (String)

## Security Considerations

### Pick Visibility

- Database queries filter picks based on game deadlines
- API endpoints enforce visibility rules
- Frontend respects these restrictions in the UI

### Authentication

- Auth0 handles user authentication
- JWT tokens secure API requests
- Role-based access controls protect admin functions

## Deployment

The application will be deployed using a CI/CD pipeline from GitHub to **Render.com**. This will involve:

- Committing code changes to a GitHub repository.
- Render.com automatically building and deploying the backend and frontend applications based on configuration files in the repository.

## Future Expansion Considerations

The schema and architecture support future additions:

- Spread betting
- Over/under predictions
- Historical statistics
- Additional league features

**Consideration for Real-time Updates:** While not in the initial scope, for easier implementation of real-time features in the future (like live score updates or immediate pick visibility changes), it's beneficial to choose backend technologies and patterns that lend themselves to real-time communication. This might involve using technologies or libraries that support WebSockets or Server-Sent Events (SSE) for future communication between the backend and frontend. Even if not actively used initially, the underlying infrastructure and architectural choices can be made with this in mind.

**TheSportsDB API Integration:** The backend integrates with the TheSportsDB API to retrieve and store game data. This involves:

- A dedicated service (ISportsDbService) responsible for fetching data from the TheSportsDB API.
- Scheduled tasks or a manual admin trigger to periodically synchronize game data.
- Mapping the TheSportsDB API response to our Games entity using GameMapper.
- Error handling and logging for API communication issues.
- Filtering of preseason games and proper handling of playoff games.

However, we're keeping the initial implementation focused on core features to maintain clarity and ease of understanding.