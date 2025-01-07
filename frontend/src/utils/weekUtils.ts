export const getWeekDisplayText = (weekCode: number): string => {
    switch (weekCode) {
        case 160:
            return "Wild Card";
        default:
            return `Week ${weekCode}`;
    }
};
