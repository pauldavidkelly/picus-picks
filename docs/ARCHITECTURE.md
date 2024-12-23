# Picus NFL Picks App - Architecture Overview

## System Overview

Think of our application like a restaurant. Just as a restaurant has a kitchen (backend) where food is prepared and a dining area (frontend) where customers interact with the service, our application has two main parts:

1. Frontend (The Dining Area)
   - This is what users see and interact with, built using React
   - Like a well-designed dining room, it's organized into different sections (pages)
   - Uses Tailwind CSS for styling (like the decoration and layout of the restaurant)
   - shadcn/ui components (like pre-made furniture that matches our style)

2. Backend (The Kitchen)
   - This is where all the important processing happens, built with .NET Core
   - Like a kitchen with different stations, it's organized into different services
   - Uses PostgreSQL as our database (like our ingredient storage system)
   - Protected by Auth0 (like having a security guard at the door)

## Data Flow

Imagine our data flow like a restaurant order:
1. Customer (user) places an order (makes a request) through their menu (frontend interface)
2. Waiter (API endpoint) takes the order to the kitchen (backend)
3. Chef (backend service) processes the order using ingredients (data from database)
4. The prepared dish (processed data) is sent back through the waiter to the customer

## Key Components

### Frontend Components
- **Pages**: Different views in our app (like different sections of the restaurant)
  - Home Page: The entrance and welcome area
  - Pick Entry: Where users make their game predictions
  - Standings: Leaderboard showing everyone's performance
  - Profile: Personal stats and settings

- **State Management**: Keeps track of what's happening (like the restaurant's ordering system)
  - User session information
  - Current picks and selections
  - Game data and schedules

### Backend Services
- **Authentication Service**: Checks who's allowed in (like the restaurant's reservation system)
- **Game Service**: Manages NFL game data (like the menu management system)
- **Pick Service**: Handles user predictions (like order processing)
- **League Service**: Manages competitions (like managing different dining events)
- **User Service**: Handles user data (like customer profiles)

### Database Structure
Like organizing our storage room, our database will have different sections:
- Users table: Player information
- Games table: NFL game details
- Picks table: User predictions
- Leagues table: Competition information
- Memberships table: Links users to leagues

## Security
Just as a restaurant has different security measures, our app is protected by:
- Auth0 for user authentication (like checking IDs at the door)
- API endpoints protection (like having secure areas for staff only)
- Data validation (like food safety checks)

## External Integrations
Like partnering with suppliers, we integrate with:
- ESPN API for game data (our game information supplier)
- Auth0 for authentication (our security service)

## Development Patterns
We follow these patterns to keep our code organized:
- Repository Pattern: Organizes database access (like having a standard way to store and retrieve supplies)
- Service Layer Pattern: Handles business logic (like having standard recipes)
- MVC Pattern: Organizes API endpoints (like having a standard way to take and fulfill orders)

## Future Considerations
Areas we might want to expand in the future:
- Real-time updates for live games
- Mobile app version
- Social features for leagues
- Advanced statistics and analytics

This architecture provides a solid foundation while remaining flexible for future enhancements. Each component is designed to be maintainable and scalable, like a well-organized restaurant that can handle both quiet days and busy rushes.