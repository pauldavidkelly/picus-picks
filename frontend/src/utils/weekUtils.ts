export const getWeekDisplayText = (weekCode: number): string => {
    switch (weekCode) {
        case 19:
            return "Wild Card";
        default:
            return `Week ${weekCode}`;
    }
};
