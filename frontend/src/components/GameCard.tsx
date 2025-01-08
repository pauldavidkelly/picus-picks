import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { GameDTO } from '../types/game';

interface GameCardProps {
    game: GameDTO;
    className?: string;
    selectedTeamId?: number;
}

export const GameCard = ({ game, className = '', selectedTeamId }: GameCardProps) => {
    // Format dates to local timezone
    const gameTime = new Date(game.gameTime);
    const formattedGameTime = format(gameTime, 'MMM d, yyyy h:mm a');

    const getTeamStyle = (teamId: number) => {
        const wasPickedByUser = selectedTeamId === teamId;
        const isWinner = game.isCompleted && game.winningTeam?.id === teamId;
        
        let className = 'p-2 rounded-lg transition-all';
        
        if (game.isCompleted) {
            if (isWinner) {
                className += ' border-2 border-green-500';
                if (wasPickedByUser) {
                    className += ' bg-green-100';
                }
            } else if (wasPickedByUser) {
                className += ' border-2 border-red-500 bg-red-100';
            }
        } else if (wasPickedByUser) {
            className += ' border-2 border-blue-500 bg-blue-100';
        }
        
        return className;
    };

    return (
        <Card className={`w-full hover:shadow-lg transition-shadow ${className}`} role="article">
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    {/* Home Team */}
                    <div className={getTeamStyle(game.homeTeam.id)}>
                        <div className="flex items-center space-x-2">
                            {game.homeTeam.iconUrl && (
                                <img 
                                    src={game.homeTeam.iconUrl} 
                                    alt={game.homeTeam.name} 
                                    className="w-8 h-8 object-contain"
                                />
                            )}
                            <div>
                                <p className="font-semibold">{game.homeTeam.name}</p>
                                {selectedTeamId === game.homeTeam.id && !game.isCompleted && (
                                    <p className="text-xs text-blue-600 font-medium">Your Pick</p>
                                )}
                                {game.isCompleted && (
                                    <p className={`text-xl ${
                                        game.homeTeamScore && game.awayTeamScore && 
                                        game.homeTeamScore > game.awayTeamScore 
                                            ? 'text-green-600' 
                                            : ''
                                    }`}>
                                        {game.homeTeamScore}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">{formattedGameTime}</p>
                        {game.location && (
                            <p className="text-xs text-gray-500">{game.location}</p>
                        )}
                        {game.isCompleted ? (
                            <p className="text-xs font-semibold text-green-600">Final</p>
                        ) : game.isPlayoffs ? (
                            <p className="text-xs font-semibold text-orange-600">Playoff Game</p>
                        ) : null}
                    </div>

                    {/* Away Team */}
                    <div className={getTeamStyle(game.awayTeam.id)}>
                        <div className="flex items-center space-x-2">
                            <div>
                                <p className="font-semibold">{game.awayTeam.name}</p>
                                {selectedTeamId === game.awayTeam.id && !game.isCompleted && (
                                    <p className="text-xs text-blue-600 font-medium">Your Pick</p>
                                )}
                                {game.isCompleted && (
                                    <p className={`text-xl ${
                                        game.homeTeamScore && game.awayTeamScore && 
                                        game.awayTeamScore > game.homeTeamScore 
                                            ? 'text-green-600' 
                                            : ''
                                    }`}>
                                        {game.awayTeamScore}
                                    </p>
                                )}
                            </div>
                            {game.awayTeam.iconUrl && (
                                <img 
                                    src={game.awayTeam.iconUrl} 
                                    alt={game.awayTeam.name} 
                                    className="w-8 h-8 object-contain"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
