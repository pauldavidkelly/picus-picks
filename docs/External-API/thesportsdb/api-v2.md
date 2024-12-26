# TheSportsDB V2 API Documentation

## Authentication
The V2 API requires authentication and is only available to Patreon supporters. Here are the key details:

- Base URL: `https://www.thesportsdb.com/api/v2/json`
- Authentication: Send your API key in the header 'X-API-KEY'
- Testing Tools: HTTPie or Postman recommended

## Livescore V2
Access real-time sports scores with these endpoints:

```
/api/v2/json/livescore/Soccer
/api/v2/json/livescore/Basketball
/api/v2/json/livescore/Ice_Hockey
/api/v2/json/livescore/4399
/api/v2/json/livescore/4380
/api/v2/json/livescore/all
```

## Lookups V2 (beta)
Retrieve detailed information about various sports entities:

### League & Team Information
```
/api/v2/json/lookup/league/4328
/api/v2/json/lookup/team/133675
/api/v2/json/lookup/team_equipment/133597
```

### Player Information
```
/api/v2/json/lookup/player/34172575
/api/v2/json/lookup/player_contracts/34146304
/api/v2/json/lookup/player_honours/34146304
/api/v2/json/lookup/player_milestones/34146304
/api/v2/json/lookup/player_teams/34146304
```

### Event Information
```
/api/v2/json/lookup/event/441613
/api/v2/json/lookup/event_lineup/1937584
/api/v2/json/lookup/event_results/652890
/api/v2/json/lookup/event_stats/1937584
/api/v2/json/lookup/event_timeline/1937584
/api/v2/json/lookup/event_tv/584911
/api/v2/json/lookup/event_highlights/2044892
```

### Venue Information
```
/api/v2/json/lookup/venue/15910
```

## General Listings V2 (beta)
Get comprehensive lists of sports data:

### All Entities
```
/api/v2/json/all/countries
/api/v2/json/all/sports
/api/v2/json/all/leagues
```

### Specific Lists
```
/api/v2/json/list/seasons/4328
/api/v2/json/list/seasonposters/4328
/api/v2/json/list/players/133604
/api/v2/json/list/players/Manchester_United
/api/v2/json/list/teams/4328
/api/v2/json/list/teams/English_Premier_League
```

## Search V2 (beta)
Search functionality for various sports entities:

```
/api/v2/json/search/league/English_Premier_League
/api/v2/json/search/team/Manchester_United
/api/v2/json/search/player/Harry_Kane
/api/v2/json/search/venue/Wembley
/api/v2/json/search/event/FIFA_World_Cup_2022-12-18_Argentina_vs_France
/api/v2/json/searchalternate/league/PFL
```

## Filter V2 (beta)
Filter sports data by various criteria:

### Event Filters
```
/api/v2/json/filter/events/4328/2003-2004
/api/v2/json/filter/events/day/2024-09-08
```

### TV Filters
```
/api/v2/json/filter/tv/day/2024-06-22
/api/v2/json/filter/tv/channel/Sky_Sports_Main_Event
/api/v2/json/filter/tv/country/United_Kingdom
/api/v2/json/filter/tv/sport/Motorsport
```

## Schedule V2 (beta)
Access scheduling information:

### League Schedules
```
/api/v2/json/schedule/next/league/4328
/api/v2/json/schedule/previous/league/4328
/api/v2/json/schedule/league/4328/2023-2024
```

### Team Schedules
```
/api/v2/json/schedule/next/team/133612
/api/v2/json/schedule/previous/team/133612
```

This documentation covers all the V2 API endpoints available in TheSportsDB. Remember that access to these endpoints requires a Patreon subscription and proper API key authentication through the request headers.