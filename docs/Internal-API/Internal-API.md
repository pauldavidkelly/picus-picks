# Picus Picks API Documentation

## Overview

The Picus Picks API provides endpoints for managing games and teams data, with a focus on sports seasons and game statistics. The API requires authentication using JWT Bearer tokens for all endpoints.

## Authentication

Authentication is handled through JWT Bearer tokens. When making requests, include your authentication token in the Authorization header using the following format:

```
Copy

Authorization: Bearer {your_token}
```

## Games Endpoints

### 1. Get Game by ID

**Endpoint:** `GET /api/Games/{id}`

Retrieves detailed information about a specific game using its unique identifier.

Parameters:

- `id` (path parameter, required): Integer identifying the specific game

Response:

- Success (200): Returns a GameDTO object containing complete game information
- Not Found (404): Returns if the game ID doesn't exist
- Unauthorized (401): Returns if authentication is missing or invalid

### 2. Get Games by Week and Season

**Endpoint:** `GET /api/Games/week/{week}/season/{season}`

Retrieves all games for a specific week within a given season.

Parameters:

- `week` (path parameter, required): Integer representing the week number
- `season` (path parameter, required): Integer representing the season year

Response:

- Success (200): Returns an array of GameDTO objects
- Unauthorized (401): Returns if authentication is missing or invalid

### 3. Get Team's Games for a Season

**Endpoint:** `GET /api/Games/team/{teamId}/season/{season}`

Retrieves all games for a specific team within a given season.

Parameters:

- `teamId` (path parameter, required): Integer identifying the team
- `season` (path parameter, required): Integer representing the season year

Response:

- Success (200): Returns an array of GameDTO objects
- Unauthorized (401): Returns if authentication is missing or invalid

### 4. Upsert Games

**Endpoint:** `POST /api/Games/upsert/{leagueId}/{season}`

Creates or updates games for a specific league and season.

Parameters:

- `leagueId` (path parameter, required): Integer identifying the league
- `season` (path parameter, required): Integer representing the season year

Response:

- Success (200): Returns an array of updated GameDTO objects
- Bad Request (400): Returns if the request data is invalid
- Unauthorized (401): Returns if authentication is missing or invalid

## Teams Endpoint

### Get Teams

**Endpoint:** `GET /Teams`

Retrieves a list of all teams.

Response:

- Success (200): Returns team information (specific response format not specified in schema)

## Data Models

### GameDTO

Represents a game with the following properties:

```
jsonCopy{
    "id": "integer",
    "externalGameId": "string (optional)",
    "gameTime": "date-time",
    "pickDeadline": "date-time",
    "week": "integer",
    "season": "integer",
    "isCompleted": "boolean",
    "isPlayoffs": "boolean",
    "location": "string (optional)",
    "homeTeamScore": "integer (optional)",
    "awayTeamScore": "integer (optional)",
    "homeTeam": "TeamDTO",
    "awayTeam": "TeamDTO",
    "winningTeam": "TeamDTO"
}
```

### TeamDTO

Represents a team with the following properties:

```
jsonCopy{
    "id": "integer",
    "name": "string (optional)",
    "abbreviation": "string (optional)",
    "city": "string (optional)",
    "iconUrl": "string (optional)",
    "bannerUrl": "string (optional)",
    "primaryColor": "string (optional)",
    "secondaryColor": "string (optional)",
    "tertiaryColor": "string (optional)",
    "conference": "ConferenceType (enum: 0, 1)",
    "division": "DivisionType (enum: 0, 1, 2, 3)"
}
```

## Error Handling

The API uses standard HTTP status codes and returns a ProblemDetails object for error responses:

```
jsonCopy{
    "type": "string (optional)",
    "title": "string (optional)",
    "status": "integer (optional)",
    "detail": "string (optional)",
    "instance": "string (optional)"
}
```

Common error codes:

- 400: Bad Request - Invalid input or request parameters
- 401: Unauthorized - Authentication required or invalid
- 404: Not Found - Requested resource doesn't exist

## Best Practices

1. Always include authentication token in requests
2. Handle rate limits appropriately (if implemented)
3. Implement proper error handling for all possible response codes
4. Cache responses when appropriate to improve performance
5. Use appropriate date-time formatting for gameTime and pickDeadline fields