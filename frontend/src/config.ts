// API configuration
declare global {
    interface Window {
        env?: {
            REACT_APP_API_BASE_URL?: string;
        };
    }
}

export const API_CONFIG = {
    BASE_URL: 'http://localhost:5172',
    ENDPOINTS: {
        GAMES: {
            BY_WEEK_AND_SEASON: (week: number, season: number) =>
                `/api/Games/week/${week}/season/${season}`,
            BY_ID: (id: number) => `/api/Games/${id}`,
            BY_TEAM_AND_SEASON: (teamId: number, season: number) =>
                `/api/Games/team/${teamId}/season/${season}`,
        }
    }
};
