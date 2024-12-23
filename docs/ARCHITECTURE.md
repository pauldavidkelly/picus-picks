# Picus NFL Picks App - Architecture Overview

## Overview
The Picus NFL Picks App is a web application that allows users to make predictions about NFL games and compete with friends in private leagues. The application is built using a modern, scalable architecture with clear separation of concerns.

## Technology Stack
- **Backend**: .NET 8 Web API
- **Database**: PostgreSQL
- **Authentication**: Auth0
- **Frontend**: React with TypeScript
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Project Structure
```
backend/
├── src/
│   ├── Picus.Api/           # Main API project
│   ├── Picus.Core/          # Core business logic
│   └── Picus.Data/          # Data access layer
├── tests/
│   ├── Picus.Api.Tests/     # API integration tests
│   └── Picus.Core.Tests/    # Core unit tests
└── docs/                    # Documentation
```

## Key Components

### API Layer (Picus.Api)
- RESTful endpoints following HTTP standards
- Controller-based routing
- Request/Response DTOs
- Global error handling
- API versioning
- Authentication middleware
- Swagger documentation

### Core Layer (Picus.Core)
- Business logic
- Domain models
- Interfaces
- Services
- Validation rules
- Custom exceptions

### Data Layer (Picus.Data)
- Entity Framework Core
- Repository pattern
- Database migrations
- Data seeding
- Query optimization

## Database Schema

### Users Table
- Id (Primary Key)
- Auth0Id (for authentication)
- Username
- DisplayName
- TimeZone
- IsActive
- Role (Admin/Player)
- LeagueId

### Games Table
- Id (Primary Key)
- ESPNGameId
- HomeTeamId
- AwayTeamId
- GameTime
- PickDeadline
- Week
- Season
- IsCompleted
- IsPlayoffs
- Location
- HomeTeamScore
- AwayTeamScore
- WinningTeamId (Foreign Key, nullable)

### Teams Table
- Id (Primary Key)
- ESPNTeamId
- Name
- Abbreviation
- City
- IconUrl
- BannerUrl
- PrimaryColor
- SecondaryColor
- TertiaryColor
- Conference (AFC/NFC)
- Division (North/South/East/West)

### Picks Table
- Id (Primary Key)
- UserId (Foreign Key)
- GameId (Foreign Key)
- SelectedTeamId (Foreign Key)
- IsCorrect
- Points

### Leagues Table
- Id (Primary Key)
- Name
- AdminUserId (Foreign Key)

## Authentication & Authorization
- Auth0 integration for secure user authentication
- JWT token validation
- Role-based access control (Admin/Player)
- Secure password handling

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/profile

### Users
- GET /api/users
- GET /api/users/{id}
- PUT /api/users/{id}
- DELETE /api/users/{id}

### Games
- GET /api/games
- GET /api/games/{id}
- POST /api/games
- PUT /api/games/{id}
- DELETE /api/games/{id}

### Picks
- GET /api/picks
- GET /api/picks/{id}
- POST /api/picks
- PUT /api/picks/{id}
- DELETE /api/picks/{id}

### Leagues
- GET /api/leagues
- GET /api/leagues/{id}
- POST /api/leagues
- PUT /api/leagues/{id}
- DELETE /api/leagues/{id}

## Error Handling
- Standardized error responses
- HTTP status codes
- Detailed error messages (development only)
- Error logging

## Caching Strategy
- In-memory caching for frequently accessed data
- Redis for distributed caching (future)
- Cache invalidation rules

## Monitoring & Logging
- Application metrics
- Performance monitoring
- Error tracking
- Audit logging
- Health checks

## Security Measures
- HTTPS enforcement
- CORS policy
- Input validation
- SQL injection prevention
- XSS protection
- Rate limiting

## Deployment
- Docker containerization
- Environment-specific configurations
- Database migrations
- Zero-downtime updates
- Backup strategy

## Testing Strategy
- Unit tests
- Integration tests
- API tests
- Load tests
- Security tests

## Future Enhancements
- Real-time updates
- Mobile app
- Advanced statistics
- Social features
- Machine learning predictions