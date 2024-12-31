import axios from 'axios';
import { getApiBaseUrl } from '../config/env';
import { Pick, PicksStatus, LeaguePicks, SubmitPickRequest } from '../types/picks';

const API_URL = `${getApiBaseUrl()}/api/picks`;

export const picksService = {
    submitPick: async (pick: SubmitPickRequest, token: string): Promise<Pick> => {
        const response = await axios.post(API_URL, pick, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getMyPicks: async (week: number, season: number, token: string): Promise<{ picks: Pick[], status: PicksStatus }> => {
        const response = await axios.get(`${API_URL}/my-picks/week/${week}/season/${season}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getLeaguePicks: async (leagueId: number, week: number, season: number, token: string): Promise<LeaguePicks> => {
        const response = await axios.get(`${API_URL}/league/${leagueId}/week/${week}/season/${season}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getPickStatus: async (week: number, season: number, token: string): Promise<PicksStatus> => {
        const response = await axios.get(`${API_URL}/status/week/${week}/season/${season}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};
