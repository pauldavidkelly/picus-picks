export const format = jest.fn((_date: Date, _formatStr: string) => {
    // Return a consistent date string for testing
    return 'Jan 1, 2024 12:00 PM';
});
