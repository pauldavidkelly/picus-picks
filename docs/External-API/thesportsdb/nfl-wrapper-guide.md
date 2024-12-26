# NFL Data Wrapper for TheSportsDB API

This documentation guides you through building a wrapper for TheSportsDB API, specifically focused on NFL (League ID: 4391) data retrieval and management.

## Authentication Setup

The wrapper needs to handle authentication for all requests. Here's how to implement it:

```typescript
interface TheSportsDBConfig {
    apiKey: string;
    baseUrl: string;
}

class TheSportsDBClient {
    private config: TheSportsDBConfig;
    
    constructor(config: TheSportsDBConfig) {
        this.config = {
            baseUrl: 'https://www.thesportsdb.com/api/v2/json',
            ...config
        };
    }

    private async makeRequest<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
            headers: {
                'X-API-KEY': this.config.apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return response.json();
    }
}
```

## NFL-Specific Interfaces

These interfaces define the structure of NFL data from the API:

```typescript
interface NFLGame {
    idEvent: string;
    strEvent: string;
    dateEvent: string;
    strTimeLocal: string;
    strTime: string;
    idHomeTeam: string;
    idAwayTeam: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: number | null;
    intAwayScore: number | null;
    strStatus: string;
    strPostponed: string;
    strTimestamp: string;
    strVenue: string;
    strCountry: string;
    strCity: string;
    strDescriptionEN: string | null;
}

interface NFLTeam {
    idTeam: string;
    strTeam: string;
    strTeamShort: string;
    strAlternate: string;
    intFormedYear: string;
    strStadium: string;
    strStadiumLocation: string;
    strWebsite: string;
    strFacebook: string;
    strTwitter: string;
    strInstagram: string;
    strDescriptionEN: string;
    strLeague: string;
    idLeague: string;
}
```

## Core NFL Data Methods

Here are the essential methods for retrieving NFL data:

```typescript
class NFLDataClient extends TheSportsDBClient {
    private readonly NFL_LEAGUE_ID = '4391';

    /**
     * Get live NFL games
     * Updates every 2 minutes for Patreon supporters
     */
    async getLiveGames(): Promise<NFLGame[]> {
        return this.makeRequest<NFLGame[]>(`/livescore/${this.NFL_LEAGUE_ID}`);
    }

    /**
     * Get NFL games for a specific date
     * @param date Format: YYYY-MM-DD
     */
    async getGamesByDate(date: string): Promise<NFLGame[]> {
        return this.makeRequest<NFLGame[]>(`/filter/events/day/${date}`);
    }

    /**
     * Get NFL schedule for current season
     */
    async getCurrentSeasonSchedule(): Promise<NFLGame[]> {
        const currentYear = new Date().getFullYear();
        return this.makeRequest<NFLGame[]>(
            `/schedule/league/${this.NFL_LEAGUE_ID}/${currentYear}-${currentYear + 1}`
        );
    }

    /**
     * Get detailed information about a specific game
     * @param eventId The ID of the game
     */
    async getGameDetails(eventId: string): Promise<NFLGame> {
        return this.makeRequest<NFLGame>(`/lookup/event/${eventId}`);
    }

    /**
     * Get team details
     * @param teamId The ID of the team
     */
    async getTeamDetails(teamId: string): Promise<NFLTeam> {
        return this.makeRequest<NFLTeam>(`/lookup/team/${teamId}`);
    }
}
```

## Usage Examples

Here's how to use the wrapper in your application:

```typescript
// Initialize the client
const nflClient = new NFLDataClient({
    apiKey: 'YOUR_API_KEY'
});

// Example: Get today's games
async function getTodaysGames() {
    const today = new Date().toISOString().split('T')[0];
    try {
        const games = await nflClient.getGamesByDate(today);
        return games;
    } catch (error) {
        console.error('Error fetching today\'s games:', error);
        throw error;
    }
}

// Example: Get live scores
async function getLiveScores() {
    try {
        const liveGames = await nflClient.getLiveGames();
        return liveGames.map(game => ({
            homeTeam: game.strHomeTeam,
            awayTeam: game.strAwayTeam,
            homeScore: game.intHomeScore,
            awayScore: game.intAwayScore,
            status: game.strStatus,
            timestamp: game.strTimestamp
        }));
    } catch (error) {
        console.error('Error fetching live scores:', error);
        throw error;
    }
}
```

## Error Handling

The wrapper includes built-in error handling for common scenarios:

```typescript
class TheSportsDBError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public endpoint?: string
    ) {
        super(message);
        this.name = 'TheSportsDBError';
    }
}

// Enhanced error handling in the makeRequest method
private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
            headers: {
                'X-API-KEY': this.config.apiKey
            }
        });

        if (!response.ok) {
            throw new TheSportsDBError(
                `API request failed: ${response.statusText}`,
                response.status,
                endpoint
            );
        }

        const data = await response.json();
        
        // Check if the API returned an error message
        if (data.error) {
            throw new TheSportsDBError(data.error);
        }

        return data;
    } catch (error) {
        if (error instanceof TheSportsDBError) {
            throw error;
        }
        throw new TheSportsDBError(
            'Failed to make API request',
            undefined,
            endpoint
        );
    }
}
```

## Rate Limiting Considerations

TheSportsDB API has rate limiting in place. The wrapper should implement rate limiting handling:

```typescript
class RateLimiter {
    private requests: number = 0;
    private lastReset: Date = new Date();
    private readonly LIMIT = 100;
    private readonly WINDOW = 60000; // 1 minute in milliseconds

    async checkLimit(): Promise<void> {
        const now = new Date();
        if (now.getTime() - this.lastReset.getTime() >= this.WINDOW) {
            this.requests = 0;
            this.lastReset = now;
        }

        if (this.requests >= this.LIMIT) {
            const waitTime = this.WINDOW - (now.getTime() - this.lastReset.getTime());
            throw new TheSportsDBError(
                `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`
            );
        }

        this.requests++;
    }
}
```

## Best Practices

1. Cache responses when appropriate to reduce API calls
2. Implement retry logic for failed requests
3. Use TypeScript for better type safety and development experience
4. Handle timezone differences in game times
5. Implement proper error logging
6. Use environment variables for API keys

## Implementation Notes

1. All timestamps are in UTC
2. Scores may be null for upcoming games
3. Live score updates occur every 2 minutes for Patreon supporters
4. The NFL season spans two years (e.g., 2023-2024)
5. Game status values can be: "Not Started", "In Progress", "Finished", "Postponed"

## Webhook Support (Optional)

For real-time updates, implement a webhook handler:

```typescript
interface WebhookPayload {
    event: 'game_start' | 'score_update' | 'game_end';
    gameId: string;
    timestamp: string;
    data: NFLGame;
}

class WebhookHandler {
    constructor(private readonly endpoint: string) {}

    async handleWebhook(payload: WebhookPayload): Promise<void> {
        // Implement webhook handling logic
        console.log(`Received ${payload.event} for game ${payload.gameId}`);
    }
}
```

## Testing

Example test cases using Jest:

```typescript
describe('NFLDataClient', () => {
    let client: NFLDataClient;

    beforeEach(() => {
        client = new NFLDataClient({
            apiKey: process.env.API_KEY || 'test_key'
        });
    });

    test('getLiveGames returns array of games', async () => {
        const games = await client.getLiveGames();
        expect(Array.isArray(games)).toBe(true);
        if (games.length > 0) {
            expect(games[0]).toHaveProperty('strEvent');
            expect(games[0]).toHaveProperty('intHomeScore');
            expect(games[0]).toHaveProperty('intAwayScore');
        }
    });

    // Add more test cases...
});
```
