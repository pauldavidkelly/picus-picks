import { getWeekDisplayText } from './weekUtils';

describe('weekUtils', () => {
    describe('getWeekDisplayText', () => {
        it('returns "Wild Card" for week 160', () => {
            expect(getWeekDisplayText(160)).toBe('Wild Card');
        });

        it('returns "Week X" for regular season weeks', () => {
            expect(getWeekDisplayText(1)).toBe('Week 1');
            expect(getWeekDisplayText(18)).toBe('Week 18');
        });
    });
});
