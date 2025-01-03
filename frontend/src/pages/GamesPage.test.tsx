import { render, screen, act } from '@testing-library/react';
import { GamesPage } from './GamesPage';
import { useGameService } from '../services/gameService';

// Mock the gameService
jest.mock('../services/gameService');
const mockGetGamesByWeekAndSeason = jest.fn();
const mockGetGameById = jest.fn();
const mockGetGamesByTeamAndSeason = jest.fn();

const mockedGameService = jest.mocked(useGameService);
mockedGameService.mockReturnValue({
    getGamesByWeekAndSeason: mockGetGamesByWeekAndSeason,
    getGameById: mockGetGameById,
    getGamesByTeamAndSeason: mockGetGamesByTeamAndSeason
});

// Mock the WeekSelector component
jest.mock('../components/WeekSelector', () => ({
    WeekSelector: ({ currentWeek, onChange }: { currentWeek: number; onChange: (week: number) => void }) => (
        <div data-testid="week-selector" onClick={() => onChange(2)}>
            Week {currentWeek}
        </div>
    ),
}));

describe('GamesPage', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Mock the gameService.getGamesByWeekAndSeason implementation
        mockGetGamesByWeekAndSeason.mockResolvedValue([]);
    });

    it('renders the page title', async () => {
        await act(async () => {
            render(<GamesPage />);
        });
        expect(screen.getByText('NFL Games')).toBeInTheDocument();
    });

    it('renders the WeekSelector with initial week 1', async () => {
        await act(async () => {
            render(<GamesPage />);
        });
        const weekSelector = screen.getByTestId('week-selector');
        expect(weekSelector).toHaveTextContent('Week 1');
    });

    it('updates the selected week when WeekSelector changes', async () => {
        await act(async () => {
            render(<GamesPage />);
        });
        
        const weekSelector = screen.getByTestId('week-selector');
        await act(async () => {
            weekSelector.click();
        });
        
        // Verify that GamesGrid is rendered with new week
        expect(mockGetGamesByWeekAndSeason).toHaveBeenCalledWith(2, expect.any(Number));
    });

    it('passes the current year to GamesGrid', async () => {
        const currentYear = new Date().getFullYear();
        await act(async () => {
            render(<GamesPage />);
        });
        
        // Verify that GamesGrid is called with current year
        expect(mockGetGamesByWeekAndSeason).toHaveBeenCalledWith(expect.any(Number), currentYear);
    });
});
