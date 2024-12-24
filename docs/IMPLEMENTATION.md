**Implementation Plan:**

Here's the updated implementation plan, incorporating the ESPN API integration in Phase 1 and reflecting the schema changes:

**Phase 1: Core Functionality - "The Foundation" (Focus: Minimum Viable Product & Data Ingestion)**

- **Goal:** Allow users to register/login, **populate games from the ESPN API**, and submit money line picks.
- **Backend:**
  - **Project Setup:** Initialize the C# Web API project, configure Entity Framework Core, and connect to the PostgreSQL database on Render.com (or a local development instance).
  - **Database Models:** Create the Users, Games, Picks, and Teams entity models with the updated schema. Implement basic CRUD operations for Teams (potentially seed initial team data).
  - **ESPN API Integration:**
    - Implement the GameDataService to fetch game data from the ESPN API. This service will handle API authentication, request formatting, and response parsing.
    - Implement a scheduled job (using a library like Hangfire or .NET's BackgroundService) to periodically fetch and synchronize game data from the ESPN API into the Games table. Start with a reasonable interval (e.g., every few hours or daily). *Alternatively, for the initial MVP, you could implement a manual admin trigger to initiate the sync.*
    - Implement logic to map the ESPN API response to the Games entity, handling data transformation and potential inconsistencies.
    - Implement error handling and logging for the GameDataService.
  - **Authentication:** Integrate Auth0 for user registration and login. Secure the API endpoints using JWT authentication.
  - **Picks Functionality:** Implement the Pick entity and the PickService and PicksController for submitting money line picks. Focus on the core logic: associating a user with a game and a selected team. Implement basic deadline validation.
- **Frontend:**
  - **Project Setup:** Initialize the React application using create-react-app or a similar tool. Install necessary dependencies, including the Auth0 React SDK and Shadcn.
  - **Authentication:** Implement user login and logout using the Auth0 React SDK.
  - **Game Listing:** Create a UI component to display a list of upcoming games. Fetch game data from the backend API. Ensure the displayed time respects the user's Timezone (using a library like moment-timezone).
  - **Pick Submission:** Create a UI component that allows logged-in users to select a winner for each game and submit their picks.
- **Deployment:**
  - Set up a GitHub repository for the project.
  - Configure Render.com to deploy the backend and frontend applications from the GitHub repository. Start with basic deployment without advanced CI/CD features if needed. Ensure any environment variables for the ESPN API key are correctly configured on Render.com.
- **Testing:**
  - Write unit tests for the PickService (e.g., testing deadline validation).
  - Write integration tests for the PicksController to ensure it correctly handles pick submission.
  - Write integration tests for the GameDataService to ensure it can fetch and map data from the ESPN API.

**Phase 2: Pick Visibility and Basic Dashboard - "Seeing the Picks" (Focus: User Interaction)**

- **Goal:** Allow users to see picks after the deadline and provide a basic dashboard.
- **Backend:**
  - **Deadline Logic:** Refine the deadline validation logic and ensure it's using the PickDeadline field.
  - **Pick Retrieval:** Implement the logic in the PickService and PicksController to retrieve and format picks for display after the deadline. Implement filtering based on the deadline.
  - **Dashboard Data:** Begin implementing the DashboardService to retrieve data for the dashboard (upcoming games requiring picks).
- **Frontend:**
  - **Picks Table:** Implement the "Picks Table" component using Shadcn components to display picks after the deadline. Fetch data from the backend.
  - **Basic Dashboard:** Create the initial user dashboard layout. Display the list of upcoming games requiring picks.
- **Testing:**
  - Write integration tests for the pick retrieval logic, ensuring visibility rules are enforced.
  - Write basic UI tests (using a tool like React Testing Library) for the "Picks Table" component.

**Phase 3: Performance Statistics and League Standings - "Tracking Performance" (Focus: Engagement)**

- **Goal:** Calculate and display user performance and league standings.
- **Backend:**
  - **Game Results:** Implement a mechanism to enter game results (potentially a basic admin interface). Update the Games table with the FinalScore, Status, Quarter, and Clock (consider how frequently you want to update these).
  - **Pick Correctness:** Implement the logic to calculate if a pick was correct after the game result is entered. Update the Picks table (IsCorrect).
  - **Performance Calculation:** Implement the logic in the DashboardService to calculate recent pick results and overall performance statistics.
  - **League Management:** Implement the Leagues entity and related services and controllers for creating and joining leagues.
  - **Standings Calculation:** Implement the logic to calculate league standings based on correct picks.
- **Frontend:**
  - **Dashboard Enhancements:** Update the dashboard to display recent pick results, performance statistics, and league standings.
  - **League Management UI:** Create UI components for users to view and manage their league memberships.
- **Testing:**
  - Write unit tests for the performance calculation and standings logic.
  - Write integration tests for the components involved in calculating and displaying performance and standings.

**Phase 4: Admin Features and Refinements - "Managing the App" (Focus: Administration)**

- **Goal:** Implement administrative functionalities.
- **Backend:**
  - **Admin Roles:** Implement role-based access control using Auth0 and potentially custom authorization logic in the API.
  - **Admin Interfaces:** Create API endpoints and services for:
    - Managing users (roles, league assignments).
    - **Manually triggering the ESPN API synchronization (if not relying solely on the scheduled job).**
    - Entering and managing game results.
    - Managing leagues.
- **Frontend:**
  - **Admin UI:** Create a separate admin section in the frontend with views for managing users, games, and leagues. Secure these views based on user roles.
- **Error Handling and Logging:** Implement comprehensive error handling and logging throughout the backend and potentially the frontend (for tracking client-side errors). Use a structured logging approach for easier analysis. Consider using a logging aggregation service.
- **End-to-End Testing:** Implement end-to-end tests for key user flows (making picks, viewing results) and admin functionalities (entering game results, triggering API sync).

The inclusion of the ESPN API integration in Phase 1 is crucial for a functional MVP. Make sure to choose an appropriate ESPN API (they may have different tiers or require authentication) and handle rate limiting and potential API changes.