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

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    {new Date(game.gameTime).toLocaleString()}
                </div>
                {isPastDeadline && (
                    <Badge variant="secondary">Locked</Badge>
                )}
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-4">
                    <TeamButton
                        team={game.awayTeam}
                        isSelected={selectedTeamId === game.awayTeam.id}
                        onClick={() => handleTeamSelect(game.awayTeam.id)}
                        disabled={isPastDeadline}
                    />
                    <span className="text-xl font-bold">@</span>
                    <TeamButton
                        team={game.homeTeam}
                        isSelected={selectedTeamId === game.homeTeam.id}
                        onClick={() => handleTeamSelect(game.homeTeam.id)}
                        disabled={isPastDeadline}
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

const TeamButton = ({ team, isSelected, onClick, disabled }: TeamButtonProps) => (
    <Button
        variant={isSelected ? 'default' : 'outline'}
        onClick={onClick}
        disabled={disabled}
        className="flex-1 h-20 flex flex-col items-center justify-center gap-2"
    >
        <img
            src={team.iconUrl}
            alt={team.name}
            className="w-8 h-8 object-contain"
        />
        <span className="text-sm font-medium">{team.name}</span>
    </Button>
);
