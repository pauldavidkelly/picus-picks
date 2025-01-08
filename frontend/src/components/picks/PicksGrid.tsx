import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { GameDTO, TeamDTO } from '@/types/game';
import { LeaguePicks, VisiblePick } from '@/types/picks';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface PicksGridProps {
    leaguePicks: LeaguePicks;
    games: GameDTO[];
}

export const PicksGrid = ({ leaguePicks, games }: PicksGridProps) => {
    const getTeamForPick = (pick: VisiblePick | undefined, game: GameDTO): TeamDTO | null => {
        // TEMPORARY DEBUG: Show all picks that exist
        if (!pick?.hasPick) return null;
        const team = pick.selectedTeamId === game.homeTeam.id ? game.homeTeam : game.awayTeam;
        return team;
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-48">Game</TableHead>
                        {leaguePicks.userPicks.map(user => (
                            <TableHead key={user.userId} className="text-center">
                                {user.userName}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {games.map(game => (
                        <TableRow key={game.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col gap-1">
                                    <span>{game.awayTeam.name} @ {game.homeTeam.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(game.gameTime).toLocaleString()}
                                    </span>
                                </div>
                            </TableCell>
                            {leaguePicks.userPicks.map(user => {
                                const pick = user.picks.find(p => p.gameId === game.id);
                                const team = getTeamForPick(pick, game);
                                
                                return (
                                    <TableCell key={user.userId} className="text-center">
                                        {/* TEMPORARY DEBUG: Show all picks that exist */}
                                        {pick?.hasPick ? (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Badge
                                                        variant="default"
                                                        className="cursor-help"
                                                    >
                                                        <img
                                                            src={team?.iconUrl}
                                                            alt={team?.name}
                                                            className="w-6 h-6 object-contain"
                                                        />
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{team?.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <span className="text-muted-foreground">No Pick</span>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
