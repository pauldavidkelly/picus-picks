import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameDTO, TeamDTO } from '@/types/game';
import { Pick } from '@/types/picks';
import { toast } from 'sonner';
import { useAuth0 } from '@auth0/auth0-react';

interface GameCardProps {
    game: GameDTO;
    userPick?: Pick;
    onPickSubmit: (pick: Pick) => Promise<void>;
}

export const GameCard = ({ game, userPick, onPickSubmit }: GameCardProps) => {
    const { user } = useAuth0();
    const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>(userPick?.selectedTeamId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notes, setNotes] = useState(userPick?.notes || '');
    
    const isPastDeadline = new Date(game.pickDeadline) < new Date();
    const hasSelected = selectedTeamId !== undefined;
    const isGameCompleted = game.isCompleted;

    const handleTeamSelect = (teamId: number) => {
        if (isPastDeadline) return;
        setSelectedTeamId(teamId === selectedTeamId ? undefined : teamId);
    };

    const handleSubmit = async () => {
        if (!selectedTeamId || isSubmitting || !user) return;

        try {
            setIsSubmitting(true);
            await onPickSubmit({
                id: 0,
                userId: user.sub!,
                gameId: game.id,
                selectedTeamId: selectedTeamId,
                notes: notes.trim() || undefined,
                submissionTime: new Date().toISOString(),
                points: 0
            });
            toast.success('Pick submitted successfully');
        } catch (error) {
            toast.error('Failed to submit pick');
            console.error('Error submitting pick:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTeamStyle = (team: TeamDTO) => {
        if (!isPastDeadline) return {};
        
        const isWinner = game.winningTeam?.id === team.id;
        const wasPickedByUser = userPick?.selectedTeamId === team.id;
        
        // Calculate isCorrect if not provided by the backend
        const isCorrect = userPick?.isCorrect ?? (
            isGameCompleted && wasPickedByUser && isWinner
        );
        
        let className = '';
        if (isGameCompleted) {
            if (isWinner) {
                className = 'border-2 border-green-500';
                if (wasPickedByUser) {
                    className += ' bg-green-100';
                }
            } else if (wasPickedByUser) {
                className = 'border-2 border-red-500 bg-red-100';
            }
        } else if (wasPickedByUser) {
            className = 'border-2 border-blue-500 bg-blue-100';
        }
        
        return { className };
    };

    // Debug info
    console.log('Game:', {
        id: game.id,
        isCompleted: game.isCompleted,
        winningTeamId: game.winningTeam?.id,
        homeScore: game.homeTeamScore,
        awayScore: game.awayTeamScore
    });
    console.log('UserPick:', userPick);

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="flex justify-between items-center">
                <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                        {new Date(game.gameTime).toLocaleString()}
                    </div>
                    {isGameCompleted && game.homeTeamScore !== undefined && game.awayTeamScore !== undefined && (
                        <div className="text-sm font-medium">
                            Final: {game.awayTeam.name} {game.awayTeamScore} - {game.homeTeamScore} {game.homeTeam.name}
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    {isPastDeadline && (
                        <Badge variant="secondary">Locked</Badge>
                    )}
                    {isGameCompleted && userPick && (
                        <Badge variant={userPick.isCorrect ? "success" : "destructive"}>
                            {userPick.isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-4">
                    <TeamButton
                        team={game.awayTeam}
                        isSelected={selectedTeamId === game.awayTeam.id}
                        onClick={() => handleTeamSelect(game.awayTeam.id)}
                        disabled={isPastDeadline}
                        {...getTeamStyle(game.awayTeam)}
                    />
                    <span className="text-xl font-bold">@</span>
                    <TeamButton
                        team={game.homeTeam}
                        isSelected={selectedTeamId === game.homeTeam.id}
                        onClick={() => handleTeamSelect(game.homeTeam.id)}
                        disabled={isPastDeadline}
                        {...getTeamStyle(game.homeTeam)}
                    />
                </div>

                <textarea
                    className="mt-4 w-full p-2 rounded-md border"
                    placeholder="Add notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isPastDeadline}
                    rows={2}
                />

                <Button
                    className="mt-4 w-full"
                    onClick={handleSubmit}
                    disabled={!hasSelected || isPastDeadline || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Pick'}
                </Button>
            </CardContent>
        </Card>
    );
};

interface TeamButtonProps {
    team: TeamDTO;
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const TeamButton = ({ team, isSelected, onClick, disabled, className }: TeamButtonProps) => (
    <Button
        variant={isSelected ? 'default' : 'outline'}
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 h-20 flex flex-col items-center justify-center gap-2 ${className}`}
    >
        <img
            src={team.iconUrl}
            alt={team.name}
            className="w-8 h-8 object-contain"
        />
        <span className="text-sm font-medium">{team.name}</span>
    </Button>
);
