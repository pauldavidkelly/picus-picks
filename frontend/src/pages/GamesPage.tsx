import { useState } from 'react';
import { GamesGrid } from '../components/GamesGrid';
import { WeekSelector } from '../components/WeekSelector';

export const GamesPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">NFL Games</h1>
        <WeekSelector 
          selectedWeek={selectedWeek} 
          onChange={setSelectedWeek} 
        />
      </div>
      
      <GamesGrid 
        week={selectedWeek} 
        season={2024} 
      />
    </div>
  );
};
