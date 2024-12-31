import axios from 'axios';
import { getApiBaseUrl } from '../config/env';
import { Pick, PicksStatus, LeaguePicks, SubmitPickRequest } from '../types/picks';

const API_URL = `${getApiBaseUrl()}/api/picks`;

export const picksService = {
    submitPick: async (pick: SubmitPickRequest): Promise<Pick> => {
        const response = await axios.post(API_URL, pick);
        return response.data;
    },

    getMyPicks: async (week: number, season: number): Promise<{ picks: Pick[], status: PicksStatus }> => {
        const response = await axios.get(`${API_URL}/my-picks/week/${week}/season/${season}`);
        return response.data;
    },

    getLeaguePicks: async (leagueId: number, week: number, season: number): Promise<LeaguePicks> => {
        const response = await axios.get(`${API_URL}/league/${leagueId}/week/${week}/season/${season}`);
        return response.data;
    },

    getPickStatus: async (week: number, season: number): Promise<PicksStatus> => {
        const response = await axios.get(`${API_URL}/status/week/${week}/season/${season}`);
        return response.data;
    }
};
