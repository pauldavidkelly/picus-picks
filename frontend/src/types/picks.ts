export interface Pick {
    id: number;
    userId: number;
    gameId: number;
    selectedTeamId: number;
    submissionTime: string;
    isCorrect?: boolean;
    notes?: string;
    points: number;
}

export interface VisiblePick {
    userId: number;
    gameId: number;
    selectedTeamId?: number;
    hasPick: boolean;
    isVisible: boolean;
}

export interface PicksStatus {
    week: number;
    season: number;
    totalGames: number;
    picksMade: number;
    isComplete: boolean;
    gamesNeedingPicks: number[];
}

export interface LeaguePicks {
    leagueId: number;
    leagueName: string;
    week: number;
    season: number;
    userPicks: UserPicks[];
}

export interface UserPicks {
    userId: number;
    userName: string;
    picks: VisiblePick[];
}

export interface SubmitPickRequest {
    gameId: number;
    selectedTeamId: number;
    notes?: string;
}
