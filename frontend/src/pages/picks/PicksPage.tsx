import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GameCard } from '@/components/picks/GameCard';
import { PicksGrid } from '@/components/picks/PicksGrid';
import { PicksStatus } from '@/components/picks/PicksStatus';
import { picksService } from '@/services/picksService';
import { useGameService } from '@/services/gameService';
import { GameDTO } from '@/types/game';
import { LeaguePicks, Pick, PicksStatus as PicksStatusType } from '@/types/picks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { getWeekDisplayText } from '@/utils/weekUtils';
import { WeekSelector } from '@/components/WeekSelector';

export const PicksPage = () => {
    const [games, setGames] = useState<GameDTO[]>([]);
    const [myPicks, setMyPicks] = useState<Pick[]>([]);
    const [leaguePicks, setLeaguePicks] = useState<LeaguePicks | null>(null);
    const [picksStatus, setPicksStatus] = useState<PicksStatusType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { week, season } = useParams<{ week: string; season: string }>();
    const weekNum = week ? parseInt(week) : undefined;
    const seasonNum = season ? parseInt(season) : undefined;
    const gameService = useGameService();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!weekNum || !seasonNum) {
                    toast.error('Invalid week or season parameters');
                    return;
                }
                
                setIsLoading(true);
                const token = await getAccessTokenSilently();
                
                // Load games for the week
                const gamesData = await gameService.getGamesByWeekAndSeason(weekNum, seasonNum);
                setGames(gamesData);

                // Load user's picks and status
                const { picks, status } = await picksService.getMyPicks(weekNum, seasonNum, token);
                setMyPicks(picks);
                setPicksStatus(status);

                // Load league picks
                const leagueId = 1; // TODO: Get from user context
                const leaguePicksData = await picksService.getLeaguePicks(leagueId, weekNum, seasonNum, token);
                setLeaguePicks(leaguePicksData);
            } catch (error) {
                console.error('Error loading picks data:', error);
                toast.error('Failed to load picks data');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [weekNum, seasonNum, getAccessTokenSilently]);

    const handlePickSubmit = async (pick: Pick) => {
        try {
            const token = await getAccessTokenSilently();
            const submittedPick = await picksService.submitPick({
                gameId: pick.gameId,
                selectedTeamId: pick.selectedTeamId,
                notes: pick.notes
            }, token);
            
            setMyPicks(prev => {
                const index = prev.findIndex(p => p.gameId === submittedPick.gameId);
                if (index >= 0) {
                    return [...prev.slice(0, index), submittedPick, ...prev.slice(index + 1)];
                }
                return [...prev, submittedPick];
            });
        } catch (error) {
            console.error('Error submitting pick:', error);
            toast.error('Failed to submit pick');
        }
    };

    const handleWeekChange = (newWeek: number) => {
        if (seasonNum) {
            navigate(`/picks/${seasonNum}/${newWeek}`);
        }
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="container py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    {weekNum ? getWeekDisplayText(weekNum) : ''} Picks
                </h1>
                {weekNum && <WeekSelector selectedWeek={weekNum} onChange={handleWeekChange} />}
            </div>

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
