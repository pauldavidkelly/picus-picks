```

```

# ToDo #

- [x] Unit tests are failing

  - [x] Make them all pass

- [x] Check everything in

- [x] PR feature

- [x] Test games are being imported correctly.

- [x] Add features to games controller

  - [x] Get game
  - [x] Get games by week id
  - [x] Tidy up mapping with some extension methods.

- [x] Switch to frontend dev

  - [x] Show games by week for making picks
  - [x] Show games from previous weeks with scores
  - [x] Show team using
    - [ ]  banner as background for cell
    - [x]  logo  
    - [x] team colours
    - [ ] Better font

- [x] Fix issue with API not being picked up correctly from .env

- [x] Talk to Claude to produce docs
  - [x] Flesh out Task 1.10

- [ ] Do we need a seasons table?
  - [ ] Games page works out season on current year
  - [ ] Talk to Claude about season table
    - [ ] Would need to update games to be part of a season

- [x] Talk to Claude about Leagues and Users
  - [x] Picks can't be completed without a valid UserId
    - [x] Add users to user table
    - [x] Do I add a list of allowed emails to the appSettings to allow only certain people in?


  - [ ] Add a league to allow users to be a part of a league

- [ ] Implement Picks
  - [ ] Frontend
    - [ ] Tests are not complete
    - [ ] What happens to complete games with picks?
    - [ ] Picks problems
      - [ ] API is not returning picks
        - [ ] 500 error
        - [ ] 403 error
  - [x] Backend
    - [x] User info stuff

- [ ] Talk to Claude about team display
  - [ ] Add links to all teams in lists to team page
  - [ ] Add navigation
  - [ ] Divisions

- [ ] Add features to teams controller

  - [ ] Get team
  - [ ] Get teams by conference
  - [ ] Get teams by division

- [x] Frontend
  - [ ] Show divisions
  - [ ] Single Teams page

- [ ] Add Dashboard for user
  - [ ] Show season stats
  - [ ] Show league
  - [ ] Show current weeks pick status.

- [ ] Add Admin page
  - [ ] Approve users

  - [ ] Kick users

  - [ ] Create league

  - [ ] Add user to league

  - [ ] Remove user from league 

  - [ ] Sync games from external API

    ## Non dev stuff to fix

- [ ] Get dotnet debugging working in Windsurf

- [ ] Add windsurfrules

- [ ] Add global rules

