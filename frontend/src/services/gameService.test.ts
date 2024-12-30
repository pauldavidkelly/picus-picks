import axios from 'axios';
import { gameService } from './gameService';
import { API_CONFIG } from '../config';
import { ConferenceType, DivisionType, GameDTO, TeamDTO } from '../types/game';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock window.env
window.env = {
    REACT_APP_API_BASE_URL: 'http://test-api.example.com'
};

// Mock localStorage
const mockGetItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: mockGetItem,
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn(),
    },
    writable: true
});

describe('gameService', () => {
    const mockToken = 'mock-token';
    const mockTeam: TeamDTO = {
        id: 1,
        name: 'Chiefs',
        city: 'Kansas City',
        conference: ConferenceType.AFC,
        division: DivisionType.West,
    };
    const mockGame: GameDTO = {
        id: 1,
        gameTime: '2024-09-01T20:00:00Z',
        pickDeadline: '2024-09-01T19:45:00Z',
        week: 1,
        season: 2024,
        isCompleted: false,
        isPlayoffs: false,
        homeTeam: mockTeam,
        awayTeam: { ...mockTeam, id: 2, name: 'Raiders' },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetItem.mockReturnValue(mockToken);
    });

    describe('getGamesByWeekAndSeason', () => {
        it('should fetch games with correct parameters', async () => {
            const week = 1;
            const season = 2024;
            mockedAxios.get.mockResolvedValueOnce({ data: [mockGame] });

            const result = await gameService.getGamesByWeekAndSeason(week, season);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_WEEK_AND_SEASON(week, season)}`,
                {
                    headers: {
                        Authorization: `Bearer ${mockToken}`,
                    },
                }
            );
            expect(result).toEqual([mockGame]);
        });

        it('should handle errors appropriately', async () => {
            const error = new Error('Network error');
            mockedAxios.get.mockRejectedValueOnce(error);

            await expect(gameService.getGamesByWeekAndSeason(1, 2024))
                .rejects.toThrow(error);
        });
    });

    describe('getGameById', () => {
        it('should fetch a game with correct parameters', async () => {
            const gameId = 1;
            mockedAxios.get.mockResolvedValueOnce({ data: mockGame });

            const result = await gameService.getGameById(gameId);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_ID(gameId)}`,
                {
                    headers: {
                        Authorization: `Bearer ${mockToken}`,
                    },
                }
            );
            expect(result).toEqual(mockGame);
        });

        it('should handle errors appropriately', async () => {
            const error = new Error('Network error');
            mockedAxios.get.mockRejectedValueOnce(error);

            await expect(gameService.getGameById(1))
                .rejects.toThrow(error);
        });
    });

    describe('getGamesByTeamAndSeason', () => {
        it('should fetch team games with correct parameters', async () => {
            const teamId = 1;
            const season = 2024;
            mockedAxios.get.mockResolvedValueOnce({ data: [mockGame] });

            const result = await gameService.getGamesByTeamAndSeason(teamId, season);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_TEAM_AND_SEASON(teamId, season)}`,
                {
                    headers: {
                        Authorization: `Bearer ${mockToken}`,
                    },
                }
            );
            expect(result).toEqual([mockGame]);
        });

        it('should handle errors appropriately', async () => {
            const error = new Error('Network error');
            mockedAxios.get.mockRejectedValueOnce(error);

            await expect(gameService.getGamesByTeamAndSeason(1, 2024))
                .rejects.toThrow(error);
        });
    });
});
