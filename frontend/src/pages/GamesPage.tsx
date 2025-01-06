import { useState } from 'react';
import { GamesGrid } from '../components/GamesGrid';
import { WeekSelector } from '../components/WeekSelector';
import { useGameService } from '../services/gameService';

export const GamesPage = () => {
  const currentYear = 2024;
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const gameService = useGameService();

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      // Hardcoding leagueId as 1 for now - you can make this configurable later
      await gameService.syncGames(4391, currentYear);
      // Refresh the page to show updated games
      window.location.reload();
    } catch (error) {
      console.error('Failed to sync games:', error);
      alert('Failed to sync games. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">NFL Games</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSyncing ? 'Syncing...' : 'Sync Games'}
          </button>
          <WeekSelector
            selectedWeek={selectedWeek}
            onChange={setSelectedWeek}
          />
        </div>
      </div>
      
      <GamesGrid 
        week={selectedWeek} 
        season={2024} 
      />
    </div>
  );
};
