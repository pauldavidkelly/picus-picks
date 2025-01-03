import { Progress } from '@/components/ui/progress';
import { PicksStatus as PicksStatusType } from '@/types/picks';
import { Badge } from '@/components/ui/badge';

interface PicksStatusProps {
    status: PicksStatusType;
}

export const PicksStatus = ({ status }: PicksStatusProps) => {
    const progressPercentage = (status.picksMade / status.totalGames) * 100;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h4 className="text-sm font-medium">
                        Week {status.week} Picks Progress
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {status.picksMade} of {status.totalGames} picks made
                    </p>
                </div>
                <Badge variant={status.isComplete ? 'success' : 'default'}>
                    {status.isComplete ? 'Complete' : 'In Progress'}
                </Badge>
            </div>

            <Progress value={progressPercentage} className="h-2" />

            {!status.isComplete && status.gamesNeedingPicks.length > 0 && (
                <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                        {status.gamesNeedingPicks.length} games still need picks
                    </p>
                </div>
            )}
        </div>
    );
};
