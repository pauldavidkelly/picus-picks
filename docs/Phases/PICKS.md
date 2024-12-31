# Task 1.10: Creating the Basic Pick Submission System

This document outlines the implementation plan for the picks submission and management system in the Picus NFL Picks application. The system allows users to make picks for upcoming games, view their own picks, and see other users' picks after game deadlines have passed.

## System Overview

The picks system needs to handle several key workflows:
- Users submitting picks for upcoming games before deadlines
- Users viewing and modifying their picks before deadlines
- Users viewing their own and others' picks after deadlines
- Users reviewing historical picks from previous weeks and seasons
- The system calculating and displaying pick accuracy and statistics

## Data Access Controls and Privacy

One of the most important aspects of the picks system is managing data visibility. Users should:
- Always be able to see their own picks
- Only see other users' picks after game deadlines have passed
- Only access picks data for leagues they belong to

This requires careful implementation of data access controls at both the service and API levels.

## Implementation Plan

### Data Layer Enhancements

We'll start by enhancing our existing Pick model to support the complete lifecycle of a pick. This foundation will support both current and future features.

````csharp
public class Pick : BaseEntity
{
    public int UserId { get; set; }
    public int GameId { get; set; }
    public int SelectedTeamId { get; set; }
    public DateTime SubmissionTime { get; set; }
    public bool? IsCorrect { get; set; }  // Null until game completion
    public string? Notes { get; set; }    // For user comments on their pick
    public int Points { get; set; }       // For future scoring systems
    
    // Navigation properties for efficient data access
    public User User { get; set; } = null!;
    public Game Game { get; set; } = null!;
    public Team SelectedTeam { get; set; } = null!;
}
````

### Data Transfer Objects (DTOs)

We need several DTOs to handle different views of pick data:

````csharp
public class VisiblePickDto
{
    public int UserId { get; set; }
    public int GameId { get; set; }
    public int? SelectedTeamId { get; set; }  // Null if pick isn't visible yet
    public bool HasPick { get; set; }         // True if user has made a pick
    public bool IsVisible { get; set; }       // True if pick details can be shown
}

public class PicksStatusDto
{
    public int Week { get; set; }
    public int Season { get; set; }
    public int TotalGames { get; set; }
    public int PicksMade { get; set; }
    public bool IsComplete { get; set; }
    public List<int> GamesNeedingPicks { get; set; } = new();
}

public class LeaguePicksDto
{
    public int LeagueId { get; set; }
    public string LeagueName { get; set; } = string.Empty;
    public int Week { get; set; }
    public int Season { get; set; }
    public List<UserPicksDto> UserPicks { get; set; } = new();
}

public class UserPicksDto
{
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public List<VisiblePickDto> Picks { get; set; } = new();
}
````

### Backend Implementation

#### Pick Service

The PickService will handle all pick-related business logic, ensuring consistency and maintainability:

```csharp
public class PickService : IPickService
{
    private readonly IRepository<Pick> _pickRepository;
    private readonly IRepository<Game> _gameRepository;
    private readonly IRepository<League> _leagueRepository;
    private readonly ILogger<PickService> _logger;

    // ... [existing SubmitPickAsync method stays the same]

    public async Task<IEnumerable<Pick>> GetLeaguePicksByWeekAsync(
        int leagueId, 
        int week, 
        int season)
    {
        // Get all games for the week
        var games = await _gameRepository.GetByWeekAndSeason(week, season);
        
        // Get all picks for these games from users in the league
        var picks = await _pickRepository.GetPicksByGamesAndLeague(
            games.Select(g => g.Id), 
            leagueId
        );

        return picks;
    }

    public async Task<IEnumerable<VisiblePickDto>> ApplyPickVisibilityRulesAsync(
        IEnumerable<Pick> picks)
    {
        var visiblePicks = new List<VisiblePickDto>();

        foreach (var pick in picks)
        {
            var game = await _gameRepository.GetByIdAsync(pick.GameId);
            if (game == null) continue;

            // A pick is visible if the game's pick deadline has passed
            bool isVisible = DateTime.UtcNow > game.PickDeadline;

            visiblePicks.Add(new VisiblePickDto
            {
                UserId = pick.UserId,
                GameId = pick.GameId,
                // Only include the selected team if the pick should be visible
                SelectedTeamId = isVisible ? pick.SelectedTeamId : null,
                HasPick = pick.SelectedTeamId != null,
                IsVisible = isVisible
            });
        }

        return visiblePicks;
    }

    public async Task<bool> UserBelongsToLeagueAsync(int userId, int leagueId)
    {
        var league = await _leagueRepository.GetByIdAsync(leagueId);
        return league?.Users.Any(u => u.Id == userId) ?? false;
    }
}
```

#### Picks Controller

The PicksController handles HTTP requests and manages pick-related API endpoints:

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PicksController : ControllerBase
{
    // ... [existing constructor and SubmitPick method stay the same]

    // Get only the current user's picks
    [HttpGet("my-picks/week/{week}/season/{season}")]
    public async Task<ActionResult<IEnumerable<PickDto>>> GetMyPicksForWeek(
        int week, 
        int season)
    {
        try
        {
            var userId = User.GetUserId();
            var picks = await _pickService.GetUserPicksByWeekAsync(userId, week, season);
            return Ok(_mapper.Map<IEnumerable<PickDto>>(picks));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user's picks");
            return StatusCode(500, new { message = "An error occurred while retrieving your picks" });
        }
    }

    // Get all users' picks for a league, applying visibility rules
    [HttpGet("league/{leagueId}/week/{week}/season/{season}")]
    public async Task<ActionResult<IEnumerable<LeaguePicksDto>>> GetLeaguePicksForWeek(
        int leagueId,
        int week, 
        int season)
    {
        try
        {
            var userId = User.GetUserId();
            if (!await _pickService.UserBelongsToLeagueAsync(userId, leagueId))
            {
                return Forbid();
            }

            var picks = await _pickService.GetLeaguePicksByWeekAsync(leagueId, week, season);
            var visiblePicks = await _pickService.ApplyPickVisibilityRulesAsync(picks);
            
            return Ok(_mapper.Map<IEnumerable<LeaguePicksDto>>(visiblePicks));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving league picks");
            return StatusCode(500, new { message = "An error occurred while retrieving league picks" });
        }
    }

    // Check pick completion status
    [HttpGet("my-picks/week/{week}/season/{season}/status")]
    public async Task<ActionResult<PicksStatusDto>> GetMyPicksStatus(int week, int season)
    {
        try
        {
            var userId = User.GetUserId();
            var status = await _pickService.GetUserPicksStatusForWeekAsync(userId, week, season);
            return Ok(status);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking picks status");
            return StatusCode(500, new { message = "An error occurred while checking picks status" });
        }
    }
}
```

### Frontend Implementation

#### Enhanced Game Card

The GameCard component now handles pick submission and displays pick status:

```typescript
interface GameCardProps {
    game: GameDTO;
    userPick?: PickDTO;
    onPickSubmit: (teamId: number) => Promise<void>;
}

export const GameCard = ({ game, userPick, onPickSubmit }: GameCardProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isPastDeadline = new Date(game.pickDeadline) < new Date();

    const handlePickSubmit = async (teamId: number) => {
        if (isPastDeadline) return;
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            await onPickSubmit(teamId);
        } catch (err) {
            setError('Failed to submit pick. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <GameInfo game={game} />
                <PickSelector
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    selectedTeamId={userPick?.selectedTeamId}
                    onSelect={handlePickSubmit}
                    disabled={isPastDeadline || isSubmitting}
                />
            </div>
            {error && <AlertBanner message={error} />}
        </div>
    );
};
```

#### Historical Picks View

The PicksPage component enables users to view historical picks:

```typescript
export const PicksPage = () => {
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedSeason, setSelectedSeason] = useState(new Date().getFullYear());
    const { picks, loading, error } = usePicksData(selectedWeek, selectedSeason);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <WeekSelector
                    selectedWeek={selectedWeek}
                    onChange={setSelectedWeek}
                />
                <SeasonSelector
                    selectedSeason={selectedSeason}
                    onChange={setSelectedSeason}
                />
            </div>
            
            {loading ? (
                <PicksGridSkeleton />
            ) : error ? (
                <ErrorAlert message={error} />
            ) : (
                <PicksGrid picks={picks} week={selectedWeek} season={selectedSeason} />
            )}
        </div>
    );
};
```

#### Picks Grid Component

The PicksGrid displays all users' picks in a table format:

```typescript
interface PicksGridProps {
    leaguePicks: LeaguePicksDTO;
    games: GameDTO[];
}

export const PicksGrid = ({ leaguePicks, games }: PicksGridProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Game</th>
                        {leaguePicks.userPicks.map(user => (
                            <th key={user.userId}>{user.userName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td className="py-2">{formatGameDisplay(game)}</td>
                            {leaguePicks.userPicks.map(user => {
                                const pick = user.picks.find(p => p.gameId === game.id);
                                return (
                                    <td key={`${game.id}-${user.userId}`} className="text-center py-2">
                                        {pick ? (
                                            pick.isVisible ? (
                                                // Show the actual pick if it's visible
                                                <TeamBadge team={getTeamById(pick.selectedTeamId)} />
                                            ) : pick.hasPick ? (
                                                // Show "Pick Made" if pick exists but isn't visible
                                                <span className="text-gray-500 text-sm">Pick Made</span>
                                            ) : (
                                                // Show dash if no pick made
                                                <span className="text-gray-400">-</span>
                                            )
                                        ) : (
                                            // Show dash if no pick found
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Helper component for cleaner rendering
const TeamBadge: React.FC<{ team: Team }> = ({ team }) => (
    <div className="flex items-center justify-center space-x-2">
        <img 
            src={team.iconUrl} 
            alt={team.name} 
            className="w-6 h-6"
        />
        <span className="text-sm font-medium">{team.abbreviation}</span>
    </div>
);
```

### State Management

The picks service handles API interactions:

```typescript
export const usePicksService = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    // Submit a new pick for a game
    const submitPick = async (
        gameId: number, 
        selectedTeamId: number
    ): Promise<PickDTO> => {
        const token = await getAccessTokenSilently();
        const response = await axios.post('/api/picks', {
            gameId,
            selectedTeamId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    };
    
    // Get the current user's picks for a week
    const getMyPicksForWeek = async (
        week: number, 
        season: number
    ): Promise<PickDTO[]> => {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
            `/api/picks/my-picks/week/${week}/season/${season}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    };

    // Get all picks for a league, with visibility rules applied
    const getLeaguePicksForWeek = async (
        leagueId: number,
        week: number,
        season: number
    ): Promise<LeaguePicksDTO> => {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
            `/api/picks/league/${leagueId}/week/${week}/season/${season}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    };

    // Check pick status for the current user
    const getPicksStatus = async (
        week: number,
        season: number
    ): Promise<PicksStatusDTO> => {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
            `/api/picks/my-picks/week/${week}/season/${season}/status`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
    };
    
    return {
        submitPick,
        getMyPicksForWeek,
        getLeaguePicksForWeek,
        getPicksStatus
    };
};
```

### Testing Strategy

#### Backend Tests

```csharp
public class PickServiceTests
{
    [Fact]
    public async Task SubmitPick_BeforeDeadline_Succeeds()
    {
        // Arrange
        var game = new Game { PickDeadline = DateTime.UtcNow.AddHours(1) };
        var pickService = CreatePickService(game);
        
        // Act
        var result = await pickService.SubmitPickAsync(1, 1, 1);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.SelectedTeamId);
    }
    
    [Fact]
    public async Task SubmitPick_AfterDeadline_ThrowsException()
    {
        // Arrange
        var game = new Game { PickDeadline = DateTime.UtcNow.AddHours(-1) };
        var pickService = CreatePickService(game);
        
        // Act & Assert
        await Assert.ThrowsAsync<PickDeadlineException>(
            () => pickService.SubmitPickAsync(1, 1, 1)
        );
    }
}
```

#### Frontend Tests

```typescript
describe('GameCard', () => {
    it('allows pick submission before deadline', async () => {
        const onPickSubmit = jest.fn();
        const game = createMockGame({ pickDeadline: addHours(new Date(), 1) });
        
        render(<GameCard game={game} onPickSubmit={onPickSubmit} />);
        
        await userEvent.click(
            screen.getByRole('button', { name: game.homeTeam.name })
        );
        
        expect(onPickSubmit).toHaveBeenCalledWith(game.homeTeam.id);
    });
    
    it('disables pick submission after deadline', () => {
        const game = createMockGame({ pickDeadline: subHours(new Date(), 1) });
        
        render(<GameCard game={game} onPickSubmit={jest.fn()} />);
        
        expect(screen.getByRole('button', { name: game.homeTeam.name }))
            .toBeDisabled();
    });
});
```

### Future Enhancements

The system is designed to support future enhancements such as:
- Spread betting and over/under predictions
- Pick confidence levels
- Advanced scoring systems
- Pick streaks and achievements
- Pick analysis and trends
- Social features (comments, reactions)
- Mobile notifications for deadlines

### Implementation Order

1. Backend Core (2-3 days):
   - Enhance Pick model and create migration
   - Implement PickService with core methods
   - Create and test PicksController endpoints

2. Frontend Pick Submission (2-3 days):
   - Enhance GameCard for pick submission
   - Implement pick submission service
   - Add loading and error states
   - Test pick submission flow

3. Historical Picks View (2-3 days):
   - Create PicksPage component
   - Implement PicksGrid
   - Add week/season selection
   - Test historical picks display

4. Testing and Polish (1-2 days):
   - Write comprehensive tests
   - Add loading skeletons
   - Improve error handling
   - Add success notifications
   - Test edge cases
