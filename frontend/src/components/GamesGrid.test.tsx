import { render, screen, waitFor } from '@testing-library/react';
import { GamesGrid } from './GamesGrid';
import { useGameService } from '../services/gameService';
import { ConferenceType, DivisionType, GameDTO } from '../types/game';

// Mock the gameService hook
jest.mock('../services/gameService');
const mockedUseGameService = useGameService as jest.MockedFunction<typeof useGameService>;

describe('GamesGrid', () => {
    const mockGames: GameDTO[] = [
        {
            id: 1,
            gameTime: '2024-09-01T20:00:00Z',
            pickDeadline: '2024-09-01T19:45:00Z',
            week: 1,
            season: 2024,
            isCompleted: false,
            isPlayoffs: false,
            homeTeam: {
                id: 1,
                name: 'Chiefs',
                conference: ConferenceType.AFC,
                division: DivisionType.West,
            },
            awayTeam: {
                id: 2,
                name: 'Raiders',
                conference: ConferenceType.AFC,
                division: DivisionType.West,
            },
        },
        {
            id: 2,
            gameTime: '2024-09-01T23:00:00Z',
            pickDeadline: '2024-09-01T22:45:00Z',
            week: 1,
            season: 2024,
            isCompleted: false,
            isPlayoffs: false,
            homeTeam: {
                id: 3,
                name: 'Broncos',
                conference: ConferenceType.AFC,
                division: DivisionType.West,
            },
            awayTeam: {
                id: 4,
                name: 'Chargers',
                conference: ConferenceType.AFC,
                division: DivisionType.West,
            },
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading state initially', () => {
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: jest.fn().mockResolvedValue([]),
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        render(<GamesGrid week={1} season={2024} />);
        
        expect(screen.getAllByTestId('skeleton')).toHaveLength(6);
    });

    it('displays games when loaded successfully', async () => {
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: jest.fn().mockResolvedValue(mockGames),
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        render(<GamesGrid week={1} season={2024} />);
        
        await waitFor(() => {
            expect(screen.getByText('Chiefs')).toBeInTheDocument();
            expect(screen.getByText('Raiders')).toBeInTheDocument();
            expect(screen.getByText('Broncos')).toBeInTheDocument();
            expect(screen.getByText('Chargers')).toBeInTheDocument();
        });
    });

    it('shows error message when loading fails', async () => {
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: jest.fn().mockRejectedValue(new Error('Failed to load')),
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        render(<GamesGrid week={1} season={2024} />);
        
        await waitFor(() => {
            expect(screen.getByText('Failed to load games. Please try again later.')).toBeInTheDocument();
        });
    });

    it('shows message when no games are available', async () => {
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: jest.fn().mockResolvedValue([]),
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        render(<GamesGrid week={1} season={2024} />);
        
        await waitFor(() => {
            expect(screen.getByText('No games scheduled for this week.')).toBeInTheDocument();
        });
    });

    it('fetches games with correct parameters', async () => {
        const getGamesByWeekAndSeasonMock = jest.fn().mockResolvedValue(mockGames);
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: getGamesByWeekAndSeasonMock,
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        render(<GamesGrid week={1} season={2024} />);
        
        await waitFor(() => {
            expect(getGamesByWeekAndSeasonMock).toHaveBeenCalledWith(1, 2024);
        });
    });

    it('refetches games when week or season changes', async () => {
        const getGamesByWeekAndSeasonMock = jest.fn().mockResolvedValue(mockGames);
        mockedUseGameService.mockReturnValue({
            getGamesByWeekAndSeason: getGamesByWeekAndSeasonMock,
            getGameById: jest.fn(),
            getGamesByTeamAndSeason: jest.fn()
        });
        const { rerender } = render(<GamesGrid week={1} season={2024} />);
        
        await waitFor(() => {
            expect(getGamesByWeekAndSeasonMock).toHaveBeenCalledWith(1, 2024);
        });

        rerender(<GamesGrid week={2} season={2024} />);
        
        await waitFor(() => {
            expect(getGamesByWeekAndSeasonMock).toHaveBeenCalledTimes(2);
            expect(getGamesByWeekAndSeasonMock).toHaveBeenNthCalledWith(2, 2, 2024);
        });
    });
});
