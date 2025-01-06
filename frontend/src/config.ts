import { getApiBaseUrl } from './config/env';

// API configuration
declare global {
    interface Window {
        env?: {
            VITE_API_BASE_URL?: string;
        };
    }
}

export const API_CONFIG = {
    BASE_URL: getApiBaseUrl(),
    ENDPOINTS: {
        GAMES: {
            BY_WEEK_AND_SEASON: (week: number, season: number) =>
                `/api/Games/week/${week}/season/${season}`,
            BY_ID: (id: number) => `/api/Games/${id}`,
            BY_TEAM_AND_SEASON: (teamId: number, season: number) =>
                `/api/Games/team/${teamId}/season/${season}`,
            UPSERT: (leagueId: number, season: number) =>
                `/api/Games/upsert/${leagueId}/${season}`,
        }
    }
};
