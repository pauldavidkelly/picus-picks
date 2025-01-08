import { useEffect, useState, useMemo } from 'react';
import { GameCard } from './GameCard';
import { useGameService } from '../services/gameService';
import { GameDTO } from '../types/game';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { picksService } from '../services/picksService';
import { useAuth0 } from '@auth0/auth0-react';
import { Pick } from '../types/picks';

interface GamesGridProps {
    week: number;
    season: number;
    className?: string;
}

export const GamesGrid = ({ week, season, className = '' }: GamesGridProps) => {
    const [games, setGames] = useState<GameDTO[]>([]);
    const [picks, setPicks] = useState<Pick[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    const gameService = useMemo(() => {
        const service = useGameService();
        return {
            getGamesByWeekAndSeason: service.getGamesByWeekAndSeason.bind(service)
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            if (!mounted) return;
            
            setLoading(true);
            setError(null);

            try {
                // Load games and picks in parallel
                const token = await getAccessTokenSilently();
                const [fetchedGames, picksData] = await Promise.all([
                    gameService.getGamesByWeekAndSeason(week, season),
                    picksService.getMyPicks(week, season, token)
                ]);

                if (mounted) {
                    // Sort games by date/time
                    const sortedGames = [...fetchedGames].sort((a, b) => 
                        new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime()
                    );
                    setGames(sortedGames);
                    setPicks(picksData.picks);
                }
            } catch (err) {
                if (mounted) {
                    setError('Failed to load games. Please try again later.');
                    console.error('Error loading data:', err);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            mounted = false;
        };
    }, [gameService, week, season, getAccessTokenSilently]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="h-24 w-full" />
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
        <div className={`space-y-4 ${className}`}>
            {games.map((game) => {
                const userPick = picks.find(p => p.gameId === game.id);
                return (
                    <GameCard 
                        key={game.id} 
                        game={game} 
                        selectedTeamId={userPick?.selectedTeamId}
                    />
                );
            })}
        </div>
    );
};
