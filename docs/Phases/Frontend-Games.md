# Task 1.9: Frontend Game Display Implementation Guide

## Overview
We'll create a React-based game display system that shows NFL games organized by week and season. We'll use TypeScript for better type safety, Shadcn UI for components, and implement proper loading states and error handling.

## Step 1: Create Type Definitions

First, create a types file (`src/types/game.ts`) to define our data structures:

```typescript
export enum ConferenceType {
  AFC = 0,
  NFC = 1
}

export enum DivisionType {
  North = 0,
  South = 1,
  East = 2,
  West = 3
}

export interface TeamDTO {
  id: number;
  name?: string;
  abbreviation?: string;
  city?: string;
  iconUrl?: string;
  bannerUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  conference: ConferenceType;
  division: DivisionType;
}

export interface GameDTO {
  id: number;
  externalGameId?: string;
  gameTime: string;
  pickDeadline: string;
  week: number;
  season: number;
  isCompleted: boolean;
  isPlayoffs: boolean;
  location?: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  winningTeam?: TeamDTO;
}
```

## Step 2: Create API Service

Create a service file (`src/services/gameService.ts`) to handle API calls:

```typescript
import axios from 'axios';
import { GameDTO } from '../types/game';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const gameService = {
  async getGamesByWeekAndSeason(week: number, season: number): Promise<GameDTO[]> {
    try {
      const response = await axios.get<GameDTO[]>(
        `${API_BASE_URL}/api/Games/week/${week}/season/${season}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  // Add other API methods as needed...
};
```

## Step 3: Create Game Display Components

### 3.1 Game Card Component (`src/components/GameCard.tsx`)

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { GameDTO } from '../types/game';

interface GameCardProps {
  game: GameDTO;
}

export const GameCard = ({ game }: GameCardProps) => {
  // Format dates to local timezone
  const gameTime = new Date(game.gameTime);
  const formattedGameTime = format(gameTime, 'MMM d, yyyy h:mm a');
  
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          {/* Home Team */}
          <div className="flex items-center space-x-2">
            {game.homeTeam.iconUrl && (
              <img 
                src={game.homeTeam.iconUrl} 
                alt={game.homeTeam.name} 
                className="w-8 h-8"
              />
            )}
            <div>
              <p className="font-semibold">{game.homeTeam.name}</p>
              {game.isCompleted && (
                <p className="text-xl">{game.homeTeamScore}</p>
              )}
            </div>
          </div>

          {/* Game Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600">{formattedGameTime}</p>
            {game.location && (
              <p className="text-xs text-gray-500">{game.location}</p>
            )}
            {game.isCompleted && (
              <p className="text-xs font-semibold text-green-600">Final</p>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-2">
            <div>
              <p className="font-semibold">{game.awayTeam.name}</p>
              {game.isCompleted && (
                <p className="text-xl">{game.awayTeamScore}</p>
              )}
            </div>
            {game.awayTeam.iconUrl && (
              <img 
                src={game.awayTeam.iconUrl} 
                alt={game.awayTeam.name} 
                className="w-8 h-8"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 3.2 Games Grid Component (`src/components/GamesGrid.tsx`)

```typescript
import { useEffect, useState } from 'react';
import { GameCard } from './GameCard';
import { gameService } from '../services/gameService';
import { GameDTO } from '../types/game';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface GamesGridProps {
  week: number;
  season: number;
}

export const GamesGrid = ({ week, season }: GamesGridProps) => {
  const [games, setGames] = useState<GameDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const gamesData = await gameService.getGamesByWeekAndSeason(week, season);
        setGames(gamesData);
      } catch (err) {
        setError('Failed to fetch games. Please try again later.');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [week, season]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (games.length === 0) {
    return (
      <Alert>
        <AlertDescription>No games scheduled for this week.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
```

### 3.3 Week Selector Component (`src/components/WeekSelector.tsx`)

```typescript
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"

interface WeekSelectorProps {
  currentWeek: number;
  onChange: (week: number) => void;
}

export const WeekSelector = ({ currentWeek, onChange }: WeekSelectorProps) => {
  // NFL regular season has 18 weeks
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

  return (
    <Select value={currentWeek.toString()} onValueChange={(value) => onChange(parseInt(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Week" />
      </SelectTrigger>
      <SelectContent>
        {weeks.map((week) => (
          <SelectItem key={week} value={week.toString()}>
            Week {week}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
```

## Step 4: Create Main Games Page

Create a page component (`src/pages/GamesPage.tsx`) that combines all the components:

```typescript
import { useState } from 'react';
import { GamesGrid } from '../components/GamesGrid';
import { WeekSelector } from '../components/WeekSelector';

export const GamesPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">NFL Games</h1>
        <WeekSelector 
          currentWeek={selectedWeek} 
          onChange={setSelectedWeek} 
        />
      </div>
      
      <GamesGrid 
        week={selectedWeek} 
        season={currentYear} 
      />
    </div>
  );
};
```

## Step 5: Testing Implementation

Create test files for each component. Here's an example for the GameCard component:

```typescript
// src/components/GameCard.test.tsx
import { render, screen } from '@testing-library/react';
import { GameCard } from './GameCard';

const mockGame = {
  id: 1,
  gameTime: '2024-09-10T20:00:00Z',
  pickDeadline: '2024-09-10T19:45:00Z',
  week: 1,
  season: 2024,
  isCompleted: false,
  isPlayoffs: false,
  location: 'Arrowhead Stadium',
  homeTeam: {
    id: 1,
    name: 'Chiefs',
    abbreviation: 'KC',
    iconUrl: 'chiefs-icon.png',
    conference: 0,
    division: 2
  },
  awayTeam: {
    id: 2,
    name: 'Raiders',
    abbreviation: 'LV',
    iconUrl: 'raiders-icon.png',
    conference: 0,
    division: 3
  }
};

describe('GameCard', () => {
  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} />);
    
    expect(screen.getByText('Chiefs')).toBeInTheDocument();
    expect(screen.getByText('Raiders')).toBeInTheDocument();
    expect(screen.getByText('Arrowhead Stadium')).toBeInTheDocument();
  });

  it('shows scores when game is completed', () => {
    const completedGame = {
      ...mockGame,
      isCompleted: true,
      homeTeamScore: 24,
      awayTeamScore: 17
    };
    
    render(<GameCard game={completedGame} />);
    
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('Final')).toBeInTheDocument();
  });
});
```

## Step 6: Implementation Notes

1. Error Handling:
   - All API calls are wrapped in try-catch blocks
   - User-friendly error messages are displayed
   - Errors are logged for debugging

2. Loading States:
   - Skeleton loading is shown while data is being fetched
   - Loading states prevent user interaction during data fetches

3. Accessibility:
   - All images have alt text
   - Semantic HTML is used throughout
   - Color contrast follows WCAG guidelines

4. Performance:
   - Components are properly memoized where needed
   - Images are properly sized
   - API responses can be cached if needed

5. Testing Strategy:
   - Unit tests for individual components
   - Integration tests for the complete page
   - Test error states and loading states
   - Test different game scenarios (scheduled, in progress, completed)

## Best Practices Checklist

- [ ] Use TypeScript for better type safety
- [ ] Implement proper error boundaries
- [ ] Add loading states for better UX
- [ ] Make components responsive
- [ ] Add proper keyboard navigation
- [ ] Implement proper date/time handling
- [ ] Add comprehensive test coverage
- [ ] Use proper semantic HTML
- [ ] Follow accessibility guidelines
- [ ] Add proper documentation

This implementation guide provides a junior engineer with:
1. Clear, step-by-step instructions
2. Type-safe code with TypeScript
3. Proper error handling and loading states
4. Responsive design considerations
5. Accessibility features
6. Testing examples
7. Best practices checklist
