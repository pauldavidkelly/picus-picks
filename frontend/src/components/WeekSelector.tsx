import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getWeekDisplayText } from "@/utils/weekUtils";

interface Week {
    code: number;
    display: string;
}

interface WeekSelectorProps {
    selectedWeek: number;
    onChange: (week: number) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ selectedWeek, onChange }) => {
    const weeks: Week[] = [
        ...Array.from({ length: 18 }, (_, i) => ({
            code: i + 1,
            display: getWeekDisplayText(i + 1)
        })),
        { code: 19, display: getWeekDisplayText(19) }
    ];

    const getWeekDisplay = (code: number): string => {
        const week = weeks.find(w => w.code === code);
        return week?.display || getWeekDisplayText(code);
    };

    return (
        <Select 
            value={selectedWeek.toString()} 
            onValueChange={(value) => onChange(Number(value))}
        >
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800" data-testid="week-selector">
                <SelectValue>{getWeekDisplay(selectedWeek)}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
                {weeks.map((week) => (
                    <SelectItem 
                        key={week.code} 
                        value={week.code.toString()}
                    >
                        {week.display}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
