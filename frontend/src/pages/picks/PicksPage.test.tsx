import { render, screen, fireEvent } from '@testing-library/react';
import { PicksPage } from './PicksPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { picksService } from '@/services/picksService';
import { useGameService } from '@/services/gameService';

// Mock the modules
jest.mock('@auth0/auth0-react');
jest.mock('@/services/picksService');
jest.mock('@/services/gameService');

// Mock the router hooks
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('PicksPage', () => {
    const mockGetAccessTokenSilently = jest.fn();
    const mockGetGamesByWeekAndSeason = jest.fn();
    const mockGetMyPicks = jest.fn();
    const mockGetLeaguePicks = jest.fn();

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Mock Auth0
        (useAuth0 as jest.Mock).mockReturnValue({
            getAccessTokenSilently: mockGetAccessTokenSilently.mockResolvedValue('mock-token'),
            isAuthenticated: true,
            isLoading: false
        });

        // Mock game service
        (useGameService as jest.Mock).mockReturnValue({
            getGamesByWeekAndSeason: mockGetGamesByWeekAndSeason.mockResolvedValue([])
        });

        // Mock picks service
        picksService.getMyPicks = mockGetMyPicks.mockResolvedValue({ 
            picks: [], 
            status: { 
                week: 1, 
                season: 2024, 
                totalGames: 0, 
                picksMade: 0, 
                isComplete: false, 
                gamesNeedingPicks: [] 
            } 
        });
        picksService.getLeaguePicks = mockGetLeaguePicks.mockResolvedValue({
            leagueId: 1,
            leagueName: 'Test League',
            week: 1,
            season: 2024,
            userPicks: []
        });
    });

    const renderWithRouter = (initialRoute: string) => {
        render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path="/picks/:season/:week" element={<PicksPage />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('displays the week selector', async () => {
        renderWithRouter('/picks/2024/1');
        const weekSelector = await screen.findByTestId('week-selector');
        expect(weekSelector).toBeInTheDocument();
    });

    it('displays Wild Card week correctly', async () => {
        renderWithRouter('/picks/2024/160');
        const heading = await screen.findByRole('heading', { name: /Wild Card Picks/i });
        expect(heading).toBeInTheDocument();
    });

    it('navigates to the correct URL when changing weeks', async () => {
        renderWithRouter('/picks/2024/1');
        
        // Wait for the week selector to be rendered
        const weekSelector = await screen.findByTestId('week-selector');
        fireEvent.click(weekSelector);

        // Select Wild Card week
        const wildCardOption = await screen.findByText('Wild Card');
        fireEvent.click(wildCardOption);

        expect(mockNavigate).toHaveBeenCalledWith('/picks/2024/160');
    });
});
