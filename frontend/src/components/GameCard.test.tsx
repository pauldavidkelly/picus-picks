import { render, screen } from '@testing-library/react';
import { GameCard } from './GameCard';
import { ConferenceType, DivisionType, GameDTO } from '../types/game';

// Mock format to return a consistent date string
jest.mock('date-fns', () => ({
    format: jest.fn(() => 'Jan 1, 2024 12:00 PM'),
}));

describe('GameCard', () => {
    const mockGame: GameDTO = {
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
            city: 'Kansas City',
            iconUrl: 'https://example.com/chiefs.png',
            conference: ConferenceType.AFC,
            division: DivisionType.West,
        },
        awayTeam: {
            id: 2,
            name: 'Raiders',
            city: 'Las Vegas',
            iconUrl: 'https://example.com/raiders.png',
            conference: ConferenceType.AFC,
            division: DivisionType.West,
        },
    };

    it('renders team names correctly', () => {
        render(<GameCard game={mockGame} />);
        
        expect(screen.getByText('Chiefs')).toBeInTheDocument();
        expect(screen.getByText('Raiders')).toBeInTheDocument();
    });

    it('renders game time correctly', () => {
        render(<GameCard game={mockGame} />);
        
        // Check for the mocked date string
        expect(screen.getByText('Jan 1, 2024 12:00 PM')).toBeInTheDocument();
    });

    it('shows team icons when provided', () => {
        render(<GameCard game={mockGame} />);
        
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'https://example.com/chiefs.png');
        expect(images[1]).toHaveAttribute('src', 'https://example.com/raiders.png');
    });

    it('shows scores when game is completed', () => {
        const completedGame: GameDTO = {
            ...mockGame,
            isCompleted: true,
            homeTeamScore: 24,
            awayTeamScore: 17,
        };

        render(<GameCard game={completedGame} />);
        
        expect(screen.getByText('24')).toBeInTheDocument();
        expect(screen.getByText('17')).toBeInTheDocument();
        expect(screen.getByText('Final')).toBeInTheDocument();
    });

    it('shows playoff indicator for playoff games', () => {
        const playoffGame: GameDTO = {
            ...mockGame,
            isPlayoffs: true,
        };

        render(<GameCard game={playoffGame} />);
        
        expect(screen.getByText('Playoff Game')).toBeInTheDocument();
    });

    it('shows location when provided', () => {
        const gameWithLocation: GameDTO = {
            ...mockGame,
            location: 'Arrowhead Stadium',
        };

        render(<GameCard game={gameWithLocation} />);
        
        expect(screen.getByText('Arrowhead Stadium')).toBeInTheDocument();
    });
});
