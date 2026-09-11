# Nightfall Game Manager


This application is essentially a digital game manager for Mafia and Werewolf-style party games. It lets users play a fully functional in-person game with no cards at all. It will let users connect to the same digital room or lobby as one another. It also lets users pick their own set of cards or roles depending on player count, and then automatically deals those cards out, one to each player. It will also allow users to vote for specific players they want out each day cycle. The game has a typical day/night cycle, where roles are able to use their abilities every night, and the reveal happens during the day. Similarly, during the day, the town (group) has the ability to vote someone out who they think may be the killer(s). Ultimately, this application will make playing your favorite party game even more enjoyable.

[Full Deails on how the game is played](https://en.wikipedia.org/wiki/Mafia_(party_game))


### Elevator pitch

Gathering your friends together for an awesome night of social deduction and spooky party games should be exciting and simple, but manual card setup, confusing voting schemes, and night phases can stall the fun. The Nightfall Game Manager is the ultimate solution for the quickest, simplest, no-card mafia/werewolf game. It turns every player's phone into a more interactive controller. Users simply join a room and then receive their hidden role, execute night actions, and vote on a real-time player elimination with a click of their phone. The application manages the tedious setup, so everyone can focus on the scheming and fun.

### Design

![Design image](FrontPage.png)![Design image](MiddlePage.png)![Design image](VotingPage.png)



### Key features

- Secure login and authentication over HTTPS
- Selectable game host/narrator option for one player
- Room creation and custom role configuration for game host/narrator
- Unique lobby join code generation for connecting mobile devices
- Secret, automated role distribution with hidden card reveal mechanics
- Synchronized real-time game loop across all connected devices
- Interactive daytime voting with live tallies and elimination results
- Storage of match history and user game statistics

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure across component views. Pages include a lobby page for entering room codes and names, a host setup page for configuring role/card counts, and a main gameplay page for role reveals, night actions, and day voting.
- **CSS** - Application styling that looks clean on mobile devices and desktop screens. Uses dark thematic styling with fitting colors, high contrast for night/day phases, and simple card reveal visual.
- **React** -  Provides the login screen, lobby setup, secret role display, and the voting page. I will use React for switching between these different screens and building the UI components.
- **Service** - Backend service with endpoints for:
    - Creating lobbies and generating unique room join codes
    - User login
    - Retrieving Game Phase Changes
    - Retrieving active voting tallies
    - Fetching custom, randomly generated player avatars using the [DiceBear API](https://www.dicebear.com/)
- **DB/Login** - Stores user profiles, match history, and player win/loss records. Passwords securely hashed and stored; users must be authenticated to join or host games.
- **WebSocket** - As players join lobbies, lock in day votes, or their player gets killed, their actions are broadcast in real time to all other connected devices to synchronize the game


## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Git commit requirement) 
    - *Couldn't spread all of my commits across multiple days because I just figure out about that requirement today. I was still working on AWS setup before today, also wasn't sure if I was going to stay in the class.*
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
