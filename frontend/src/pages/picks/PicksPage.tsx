import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GameCard } from '@/components/picks/GameCard';
import { PicksGrid } from '@/components/picks/PicksGrid';
import { PicksStatus } from '@/components/picks/PicksStatus';
import { picksService } from '@/services/picksService';
import { gamesService } from '@/services/gamesService';
import { Game } from '@/types/game';
import { LeaguePicks, Pick, PicksStatus as PicksStatusType } from '@/types/picks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const PicksPage = () => {
    const { week = '1', season = new Date().getFullYear().toString() } = useParams();
    
    const [games, setGames] = useState<Game[]>([]);
    const [myPicks, setMyPicks] = useState<Pick[]>([]);
    const [leaguePicks, setLeaguePicks] = useState<LeaguePicks | null>(null);
    const [picksStatus, setPicksStatus] = useState<PicksStatusType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const weekNum = parseInt(week);
    const seasonNum = parseInt(season);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                
                // Load games for the week
                const gamesData = await gamesService.getGames(weekNum, seasonNum);
                setGames(gamesData);

                // Load user's picks and status
                const { picks, status } = await picksService.getMyPicks(weekNum, seasonNum);
                setMyPicks(picks);
                setPicksStatus(status);

                // Load league picks
                const leagueId = 1; // TODO: Get from user context
                const leaguePicksData = await picksService.getLeaguePicks(leagueId, weekNum, seasonNum);
                setLeaguePicks(leaguePicksData);
            } catch (error) {
                console.error('Error loading picks data:', error);
                toast.error('Failed to load picks data');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [weekNum, seasonNum]);

    const handlePickSubmit = (pick: Pick) => {
        setMyPicks(prev => {
            const index = prev.findIndex(p => p.gameId === pick.gameId);
            if (index >= 0) {
                return [...prev.slice(0, index), pick, ...prev.slice(index + 1)];
            }
            return [...prev, pick];
        });
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="container py-6 space-y-6">
            <h1 className="text-3xl font-bold">
                Week {week} Picks
            </h1>

            {picksStatus && (
                <PicksStatus status={picksStatus} />
            )}

            <Tabs defaultValue="make-picks">
                <TabsList>
                    <TabsTrigger value="make-picks">Make Picks</TabsTrigger>
                    <TabsTrigger value="all-picks">All Picks</TabsTrigger>
                </TabsList>

                <TabsContent value="make-picks" className="space-y-6">
                    {games.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                            userPick={myPicks.find(p => p.gameId === game.id)}
                            onPickSubmit={handlePickSubmit}
                        />
                    ))}
                </TabsContent>

                <TabsContent value="all-picks">
                    {leaguePicks && (
                        <PicksGrid
                            leaguePicks={leaguePicks}
                            games={games}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="container py-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-20 w-full" />
        
        <div className="space-y-6">
            {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-48 w-full" />
            ))}
        </div>
    </div>
);
