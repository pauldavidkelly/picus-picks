import { useEffect, useState } from 'react';
import { GameCard } from './GameCard';
import { gameService } from '../services/gameService';
import { GameDTO } from '../types/game';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface GamesGridProps {
    week: number;
    season: number;
    className?: string;
}

export const GamesGrid = ({ week, season, className = '' }: GamesGridProps) => {
    const [games, setGames] = useState<GameDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedGames = await gameService.getGamesByWeekAndSeason(week, season);
                setGames(fetchedGames);
            } catch (err) {
                setError('Failed to load games. Please try again later.');
                console.error('Error loading games:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [week, season]);

    if (loading) {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
                {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="h-32 w-full" />
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};
