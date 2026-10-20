import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './lobby.css';

export function Lobby() {
  const navigate = useNavigate();

  // State variables for reactivity
  const [isInLobby, setIsInLobby] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [activeRoomCode, setActiveRoomCode] = useState('');
  const [isNarrator, setIsNarrator] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Braden', time: 'Host' },
    { id: 2, name: 'Sarah', time: 'Joined 2m ago' },
    { id: 3, name: 'Mike', time: 'Joined 5m ago' },
  ]);

  useEffect(() => {
    // Only run the simulation when the user is actively in a lobby
    if (!isInLobby) return;

    const mockNames = ['Alex', 'Taylor', 'Jordan', 'Casey', 'Morgan', 'Sam', 'Riley'];
    
    const interval = setInterval(() => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      
      setPlayers((prevPlayers) => {
        // Prevent duplicate names in the room
        if (prevPlayers.some((p) => p.name === randomName)) return prevPlayers;
        
        return [
          ...prevPlayers,
          { id: Date.now(), name: randomName, time: 'Joined just now...' }
        ];
      });
    }, 6000); // Adds a new player every 6 seconds

    // Cleanup interval when leaving the room
    return () => clearInterval(interval);
  }, [isInLobby]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomCodeInput) return;
    setActiveRoomCode(roomCodeInput.toUpperCase());
    setIsNarrator(false);
    setIsInLobby(true);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    setActiveRoomCode('ABCD'); // Mock generated room code
    setIsNarrator(true);
    setIsInLobby(true);
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    navigate('/game');
  };

return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-center">
      {!isInLobby ? (
        /* --- VIEW 1: Join or Create a Room (Shown when NOT in a lobby) --- */
        <section id="lobby-entry" className="container py-5 my-auto">
          <div className="row g-4">
            
            {/* Join a Game Card */}
            <div className="col-md-6">
              <div className="card shadow-sm border-secondary h-100 p-5 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="h4 card-title mb-3">Join a Game</h2>
                  <div className="mb-3">
                    <label htmlFor="room-code" className="form-label">Room Code:</label>
                    <input 
                      type="text" 
                      id="room-code" 
                      name="room-code" 
                      className="form-control text-uppercase" 
                      placeholder="e.g. ABCD" 
                      value={roomCodeInput}
                      onChange={(e) => setRoomCodeInput(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <form onSubmit={handleJoinRoom}>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">Join Room</button>
                </form>
              </div>
            </div>

            {/* Host a Game Card */}
            <div className="col-md-6">
              <div className="card shadow-sm border-secondary h-100 p-5 d-flex flex-column justify-content-between">
                <div>
                  <h2 className="h4 card-title mb-3">Host a Game</h2>
                  <p className="text-white-50 small mb-4">
                    Start a new session as the Narrator to manage roles and lead the match.
                  </p>
                </div>
                <form onSubmit={handleCreateRoom}>
                  <button type="submit" className="btn btn-success w-100 fw-semibold py-2">
                    Create New Room (Become Narrator)
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>
      ) : (
        /* --- VIEW 2: Active Room (Shown AFTER joining/creating) --- */
        <section id="active-room" className="container my-5">
          <div className="text-center mb-4">
            <h2 className="display-6">Room Code: <span className="text-warning fw-bold">{activeRoomCode}</span></h2>
            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={() => setIsInLobby(false)}>
              Leave Room
            </button>
          </div>

          {/* Connected Players Card */}
          <div id="live-players" className="card shadow-sm border-secondary mb-5">
            <div className="card-header border-secondary text-center py-3">
              <h3 className="h4 mb-1">Connected Players ({players.length})</h3>
              <p className="text-white-50 small mb-0">(WebSocket Simulation Active via setInterval)</p>
            </div>
            
            <ul className="list-group list-group-flush text-center fs-5">
              {players.map((player, index) => {
                const isHost = index === 0; // First player represents the host/narrator
                return (
                  <li key={player.id} className="list-group-item bg-transparent text-light py-3 border-secondary">
                    {isHost ? '👑 ' : ''} {player.name} 
                    {isHost ? (
                      <span className="badge bg-success ms-2">{isNarrator ? 'Narrator' : 'Host'}</span>
                    ) : (
                      <span className="text-white-50 fs-6 ms-2"><i>({player.time})</i></span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Narrator Role Setup - ONLY rendered if user is the host/narrator */}
          {isNarrator && (
            <div id="host-controls" className="card shadow-sm border-secondary p-4">
              <h3 className="h4 card-title border-bottom border-secondary pb-2 mb-3">Narrator Role Setup (Host Only)</h3>

              <form onSubmit={(e) => { e.preventDefault(); navigate('/game'); }}>
                <fieldset className="row g-3 text-center mb-4">
                  <legend className="h6 text-white-50 mb-3 text-start">Select Role Quantities</legend>

                  <div className="col-6 col-md-3">
                    <label htmlFor="mafia-count" className="form-label">Mafia / Werewolves</label>
                    <input type="number" id="mafia-count" min="1" max="10" defaultValue="2" className="form-control text-center mx-auto" style={{ maxWidth: '90px' }} />
                  </div>

                  <div className="col-6 col-md-3">
                    <label htmlFor="doctor-count" className="form-label">Doctor / Medic</label>
                    <input type="number" id="doctor-count" min="0" max="5" defaultValue="1" className="form-control text-center mx-auto" style={{ maxWidth: '90px' }} />
                  </div>

                  <div className="col-6 col-md-3">
                    <label htmlFor="detective-count" className="form-label">Detective / Sheriff</label>
                    <input type="number" id="detective-count" min="0" max="5" defaultValue="1" className="form-control text-center mx-auto" style={{ maxWidth: '90px' }} />
                  </div>

                  <div className="col-6 col-md-3">
                    <label htmlFor="villager-count" className="form-label">Town / Villagers</label>
                    <input type="number" id="villager-count" min="1" max="20" defaultValue="4" className="form-control text-center mx-auto" style={{ maxWidth: '90px' }} />
                  </div>
                </fieldset>
                <button type="submit" className="btn btn-danger w-100 fw-semibold py-2 fs-5">Start Game</button>
              </form>
            </div>
          )}
        </section>
      )}
    </main>
  );
}