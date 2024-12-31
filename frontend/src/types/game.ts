export enum ConferenceType {
  AFC = 0,
  NFC = 1
}

export enum DivisionType {
  North = 0,
  South = 1,
  East = 2,
  West = 3
}

export interface TeamDTO {
  id: number;
  name?: string;
  abbreviation?: string;
  city?: string;
  iconUrl?: string;
  bannerUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  conference: ConferenceType;
  division: DivisionType;
}

export interface GameDTO {
  id: number;
  externalGameId?: string;
  gameTime: string;
  pickDeadline: string;
  week: number;
  season: number;
  isCompleted: boolean;
  isPlayoffs: boolean;
  location?: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  winningTeam?: TeamDTO;
}
