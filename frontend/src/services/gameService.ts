import axios from 'axios';
import { GameDTO } from '../types/game';
import { API_CONFIG } from '../config';
import { useAuthService } from './authService';

/**
 * Service for handling game-related API calls
 */
export const useGameService = () => {
    const { getToken } = useAuthService();

    return {
        /**
         * Fetches games for a specific week and season
         * @param week - The week number
         * @param season - The season year
         * @returns Promise containing an array of games
         */
        async getGamesByWeekAndSeason(week: number, season: number): Promise<GameDTO[]> {
            try {
                const token = await getToken();
                const response = await axios.get<GameDTO[]>(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_WEEK_AND_SEASON(week, season)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error('Error fetching games:', error);
                throw error;
            }
        },

        /**
         * Fetches a specific game by its ID
         * @param id - The game ID
         * @returns Promise containing the game data
         */
        async getGameById(id: number): Promise<GameDTO> {
            try {
                const token = await getToken();
                const response = await axios.get<GameDTO>(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_ID(id)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error('Error fetching game:', error);
                throw error;
            }
        },

        /**
         * Fetches all games for a specific team in a season
         * @param teamId - The team ID
         * @param season - The season year
         * @returns Promise containing an array of games
         */
        async getGamesByTeamAndSeason(teamId: number, season: number): Promise<GameDTO[]> {
            try {
                const token = await getToken();
                const response = await axios.get<GameDTO[]>(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.BY_TEAM_AND_SEASON(teamId, season)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error('Error fetching team games:', error);
                throw error;
            }
        },
        
        /**
         * Syncs games for a specific league and season
         * @param leagueId - The league ID
         * @param season - The season year
         */
        async syncGames(leagueId: number, season: number): Promise<void> {
            try {
                const token = await getToken();
                await axios.post(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES.UPSERT(leagueId, season)}`,
                    {},  // empty body as it's not needed
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Error syncing games:', error);
                throw error;
            }
        }
    };
};
