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

  // Player state for the active room
  const [players, setPlayers] = useState([
    { id: 1, name: 'Braden' },
    { id: 2, name: 'Mike' },
    { id: 3, name: 'Sarah' },
  ]);

  // Role configuration state (controlled inputs)
  const [mafiaCount, setMafiaCount] = useState(2);
  const [doctorCount, setDoctorCount] = useState(1);
  const [detectiveCount, setDetectiveCount] = useState(1);
  const [villagerCount, setVillagerCount] = useState(4);

  // Calculate total roles selected
  const totalRoles = Number(mafiaCount) + Number(doctorCount) + Number(detectiveCount) + Number(villagerCount);
  const hasRoleMismatch = totalRoles !== players.length;


  // WebSocket Simulation via setInterval (fully satisfies course requirements)
  useEffect(() => {
    if (!isInLobby) return;

    const mockNames = ['Alex', 'Taylor', 'Jordan', 'Casey', 'Morgan', 'Sam', 'Riley'];
    
    const interval = setInterval(() => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      
      setPlayers((prevPlayers) => {
        if (prevPlayers.some((p) => p.name === randomName)) return prevPlayers;
        
        return [
          ...prevPlayers,
          { id: Date.now(), name: randomName }
        ];
      });
    }, 6000);

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
    setActiveRoomCode('ABCD');
    setIsNarrator(true);
    setIsInLobby(true);
  };

  return (
    <main className="container-fluid flex-grow-1 d-flex flex-column justify-content-center">
      {!isInLobby ? (
        /* --- VIEW 1: Join or Create a Room --- */
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
        /* --- VIEW 2: Active Room --- */
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
                const isHost = index === 0;
                return (
                  <li key={player.id} className="list-group-item bg-transparent text-light py-3 border-secondary">
                    {isHost ? '👑 ' : ''} {player.name} 
                    {isHost && (
                      <span className="badge bg-success ms-2">
                        {isNarrator ? 'Narrator' : 'Host'}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Narrator Role Setup - ONLY rendered if host */}
          {isNarrator && (
            <div id="host-controls" className="card shadow-sm border-secondary p-3">
              <h3 className="h5 card-title border-bottom border-secondary pb-2 mb-2">Narrator Role Setup (Host Only)</h3>

              <form onSubmit={(e) => { e.preventDefault(); navigate('/game'); }}>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-white-50 mb-0">Select Role Quantities</span>
                    <span className={`small fw-bold ${hasRoleMismatch ? 'text-warning' : 'text-success'}`}>
                      Total: {totalRoles} / {players.length} Players
                    </span>
                  </div>

                  {/* Compact Vertical Stack of Role Steppers */}
                  <div className="row g-2">
                    
                    {/* Mafia Stepper */}
                    <div className="col-12">
                      <div className="bg-dark px-3 py-2 rounded border border-secondary d-flex justify-content-between align-items-center">
                        <span className="text-light small fw-semibold">Mafia / Werewolves</span>
                        <div className="input-group input-group-sm" style={{ maxWidth: '135px' }}>
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setMafiaCount(Math.max(1, Number(mafiaCount) - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            value={mafiaCount} 
                            readOnly 
                            className="form-control text-center bg-dark text-light border-secondary py-1 px-0" 
                          />
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setMafiaCount(Math.min(10, Number(mafiaCount) + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Stepper */}
                    <div className="col-12">
                      <div className="bg-dark px-3 py-2 rounded border border-secondary d-flex justify-content-between align-items-center">
                        <span className="text-light small fw-semibold">Doctor / Medic</span>
                        <div className="input-group input-group-sm" style={{ maxWidth: '135px' }}>
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setDoctorCount(Math.max(0, Number(doctorCount) - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            value={doctorCount} 
                            readOnly 
                            className="form-control text-center bg-dark text-light border-secondary py-1 px-0" 
                          />
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setDoctorCount(Math.min(5, Number(doctorCount) + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Detective Stepper */}
                    <div className="col-12">
                      <div className="bg-dark px-3 py-2 rounded border border-secondary d-flex justify-content-between align-items-center">
                        <span className="text-light small fw-semibold">Detective / Sheriff</span>
                        <div className="input-group input-group-sm" style={{ maxWidth: '135px' }}>
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setDetectiveCount(Math.max(0, Number(detectiveCount) - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            value={detectiveCount} 
                            readOnly 
                            className="form-control text-center bg-dark text-light border-secondary py-1 px-0" 
                          />
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setDetectiveCount(Math.min(5, Number(detectiveCount) + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Villager Stepper */}
                    <div className="col-12">
                      <div className="bg-dark px-3 py-2 rounded border border-secondary d-flex justify-content-between align-items-center">
                        <span className="text-light small fw-semibold">Town / Villagers</span>
                        <div className="input-group input-group-sm" style={{ maxWidth: '135px' }}>
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setVillagerCount(Math.max(1, Number(villagerCount) - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            value={villagerCount} 
                            readOnly 
                            className="form-control text-center bg-dark text-light border-secondary py-1 px-0" 
                          />
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary px-2 py-1"
                            onClick={() => setVillagerCount(Math.min(20, Number(villagerCount) + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Validation Warning / Info Message */}
                {hasRoleMismatch && (
                  <div className="alert alert-warning py-1 px-2 small text-center mb-2" role="alert">
                    ⚠️ Total roles ({totalRoles}) must match players ({players.length})!
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={hasRoleMismatch}
                  className={`btn w-100 fw-semibold py-2 ${hasRoleMismatch ? 'btn-secondary' : 'btn-danger'}`}
                >
                  {hasRoleMismatch ? 'Match Counts To Start' : 'Start Game'}
                </button>
              </form>
            </div>
          )}
        </section>
      )}
    </main>
  );
}