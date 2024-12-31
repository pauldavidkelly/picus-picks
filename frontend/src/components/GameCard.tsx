import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { GameDTO } from '../types/game';

interface GameCardProps {
    game: GameDTO;
    className?: string;
}

export const GameCard = ({ game, className = '' }: GameCardProps) => {
    // Format dates to local timezone
    const gameTime = new Date(game.gameTime);
    const formattedGameTime = format(gameTime, 'MMM d, yyyy h:mm a');

    return (
        <Card className={`w-full hover:shadow-lg transition-shadow ${className}`} role="article">
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    {/* Home Team */}
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
                    <div className="flex items-center space-x-2">
                        <div>
                            <p className="font-semibold">{game.awayTeam.name}</p>
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
            </CardContent>
        </Card>
    );
};
