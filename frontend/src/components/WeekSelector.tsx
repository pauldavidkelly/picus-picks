import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface WeekSelectorProps {
    selectedWeek: number;
    onChange: (week: number) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ selectedWeek, onChange }) => {
    const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <Select 
            value={selectedWeek.toString()} 
            onValueChange={(value) => onChange(Number(value))}
        >
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800" data-testid="week-selector">
                <SelectValue>Week {selectedWeek}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
                {weeks.map((week) => (
                    <SelectItem 
                        key={week} 
                        value={week.toString()}
                    >
                        Week {week}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
