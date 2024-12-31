import { ConferenceType, DivisionType, TeamDTO, GameDTO } from './game';

describe('Game Types', () => {
  describe('ConferenceType', () => {
    it('should have correct values', () => {
      expect(ConferenceType.AFC).toBe(0);
      expect(ConferenceType.NFC).toBe(1);
    });
  });

  describe('DivisionType', () => {
    it('should have correct values', () => {
      expect(DivisionType.North).toBe(0);
      expect(DivisionType.South).toBe(1);
      expect(DivisionType.East).toBe(2);
      expect(DivisionType.West).toBe(3);
    });
  });

  describe('TeamDTO', () => {
    it('should accept valid team data', () => {
      const validTeam: TeamDTO = {
        id: 1,
        name: 'Buffalo Bills',
        abbreviation: 'BUF',
        city: 'Buffalo',
        iconUrl: 'https://example.com/bills.png',
        conference: ConferenceType.AFC,
        division: DivisionType.East
      };

      expect(validTeam.id).toBe(1);
      expect(validTeam.name).toBe('Buffalo Bills');
      expect(validTeam.conference).toBe(ConferenceType.AFC);
      expect(validTeam.division).toBe(DivisionType.East);
    });

    it('should accept team data with optional fields omitted', () => {
      const minimalTeam: TeamDTO = {
        id: 1,
        conference: ConferenceType.AFC,
        division: DivisionType.East
      };

      expect(minimalTeam.id).toBe(1);
      expect(minimalTeam.name).toBeUndefined();
      expect(minimalTeam.iconUrl).toBeUndefined();
      expect(minimalTeam.conference).toBe(ConferenceType.AFC);
      expect(minimalTeam.division).toBe(DivisionType.East);
    });
  });

  describe('GameDTO', () => {
    const homeTeam: TeamDTO = {
      id: 1,
      name: 'Buffalo Bills',
      conference: ConferenceType.AFC,
      division: DivisionType.East
    };

    const awayTeam: TeamDTO = {
      id: 2,
      name: 'Miami Dolphins',
      conference: ConferenceType.AFC,
      division: DivisionType.East
    };

    it('should accept valid game data', () => {
      const validGame: GameDTO = {
        id: 1,
        gameTime: '2024-09-10T19:00:00Z',
        pickDeadline: '2024-09-10T18:45:00Z',
        week: 1,
        season: 2024,
        isCompleted: false,
        isPlayoffs: false,
        homeTeam,
        awayTeam
      };

      expect(validGame.id).toBe(1);
      expect(validGame.gameTime).toBe('2024-09-10T19:00:00Z');
      expect(validGame.week).toBe(1);
      expect(validGame.season).toBe(2024);
      expect(validGame.isCompleted).toBe(false);
      expect(validGame.isPlayoffs).toBe(false);
      expect(validGame.homeTeam).toBe(homeTeam);
      expect(validGame.awayTeam).toBe(awayTeam);
    });

    it('should accept completed game data with scores', () => {
      const completedGame: GameDTO = {
        id: 1,
        gameTime: '2024-09-10T19:00:00Z',
        pickDeadline: '2024-09-10T18:45:00Z',
        week: 1,
        season: 2024,
        isCompleted: true,
        isPlayoffs: false,
        homeTeam,
        awayTeam,
        homeTeamScore: 24,
        awayTeamScore: 21,
        winningTeam: homeTeam
      };

      expect(completedGame.isCompleted).toBe(true);
      expect(completedGame.homeTeamScore).toBe(24);
      expect(completedGame.awayTeamScore).toBe(21);
      expect(completedGame.winningTeam).toBe(homeTeam);
    });

    it('should accept playoff game data', () => {
      const playoffGame: GameDTO = {
        id: 1,
        gameTime: '2025-01-10T19:00:00Z',
        pickDeadline: '2025-01-10T18:45:00Z',
        week: 19,
        season: 2024,
        isCompleted: false,
        isPlayoffs: true,
        location: 'Highmark Stadium, Buffalo',
        homeTeam,
        awayTeam
      };

      expect(playoffGame.isPlayoffs).toBe(true);
      expect(playoffGame.location).toBe('Highmark Stadium, Buffalo');
      expect(playoffGame.week).toBe(19); // Playoff week
    });
  });
});
