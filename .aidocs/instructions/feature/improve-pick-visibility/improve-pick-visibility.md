# Improve Pick Visibility

## Task Description
Currently, when viewing games in the picks page, it's hard to see which team was picked. This task improves the visibility of picked teams by adding clear visual indicators.

## Changes
1. Base GameCard Component:
   - Added visual indicators for picked teams (blue border/background)
   - Added "Your Pick" text under the team name
   - For completed games:
     - Winning team: green border
     - Correct pick: green background
     - Incorrect pick: red border and background

2. GamesGrid Component:
   - Added integration with picks service to fetch user's picks
   - Now passes selectedTeamId to GameCard components

## Technical Details
- Modified `GameCard.tsx` to support selectedTeamId prop
- Updated `GamesGrid.tsx` to fetch and display user picks
- Maintained consistent styling with the picks version of GameCard

## Testing
The changes are primarily visual and can be tested by:
1. Viewing upcoming games with picks made
2. Viewing completed games with correct and incorrect picks
