import React from 'react';
import { useNavigate } from 'react-router-dom';
import './lobby.css';

export function Lobby() {
  const navigate = useNavigate();

  const handleStartGame = (e) => {
    e.preventDefault();
    navigate('/game');
  };

  return (
    <main className="container-fluid flex-grow-1">
      {/* Join or Create a Room */}
      <section id="lobby-entry" className="container my-5">
        <div className="row g-4">
          
          {/* Join a Game Card */}
          <div className="col-md-6">
            <div className="card shadow-sm border-secondary h-100 p-4">
              <h2 className="h4 card-title mb-3">Join a Game</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="room-code" className="form-label">Room Code:</label>
                  <input 
                    type="text" 
                    id="room-code" 
                    name="room-code" 
                    className="form-control text-uppercase" 
                    placeholder="e.g. ABCD" 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-semibold">Join Room</button>
              </form>
            </div>
          </div>

          {/* Host a Game Card */}
          <div className="col-md-6">
            <div className="card shadow-sm border-secondary h-100 p-4 d-flex flex-column justify-content-between">
              <div>
                <h2 className="h4 card-title mb-3">Host a Game</h2>
                <p className="text-white-50 small mb-4">
                  Start a new session as the Narrator to manage roles and lead the match.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <button type="submit" className="btn btn-success w-100 fw-semibold mt-auto py-2">
                  Create New Room (Become Narrator)
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Active Room (What users see after joining/creating) */}
      <section id="active-room" className="container my-5">
        <div className="text-center mb-4">
          <h2 className="display-6">Room Code: <span className="text-warning fw-bold">ABCD</span></h2>
        </div>

        {/* Connected Players Card */}
        <div id="live-players" className="card shadow-sm border-secondary mb-5">
          <div className="card-header border-secondary text-center py-3">
            <h3 className="h4 mb-1">Connected Players (3)</h3>
            <p className="text-white-50 small mb-0">(WebSocket Placeholder; will update automatically)</p>
            <p className="text-white-50 small mb-0"><i>Dicebear generated user avatars might go here as well.</i></p>
          </div>
          
          <ul className="list-group list-group-flush text-center fs-5">
            <li className="list-group-item bg-transparent text-light py-3 border-secondary">
              👑 Braden <span className="badge bg-success ms-2">Narrator</span>
            </li>
            <li className="list-group-item bg-transparent text-light py-3 border-secondary">
              Sarah <span className="text-white-50 fs-6"><i>(Joined just now...)</i></span>
            </li>
            <li className="list-group-item bg-transparent text-light py-3 border-secondary">
              Mike <span className="text-white-50 fs-6"><i>(Joined 12s ago...)</i></span>
            </li>
          </ul>
        </div>

        {/* Narrator Role Setup */}
        <div id="host-controls" className="card shadow-sm border-secondary p-4">
          <h3 className="h4 card-title border-bottom border-secondary pb-2 mb-3">Narrator Role Setup (Host Only)</h3>

          <form onSubmit={handleStartGame}>
            <fieldset className="row g-3 text-center mb-4">
              <legend className="h6 text-white-50 mb-3 text-start">Select Role Quantities</legend>

              <div className="col-6 col-md-3">
                <label htmlFor="mafia-count" className="form-label">Mafia / Werewolves</label>
                <input 
                  type="number" 
                  id="mafia-count" 
                  name="mafia" 
                  min="1" 
                  max="10" 
                  defaultValue="2" 
                  className="form-control text-center mx-auto" 
                  style={{ maxWidth: '90px' }} 
                />
              </div>

              <div className="col-6 col-md-3">
                <label htmlFor="doctor-count" className="form-label">Doctor / Medic</label>
                <input 
                  type="number" 
                  id="doctor-count" 
                  name="doctor" 
                  min="0" 
                  max="5" 
                  defaultValue="1" 
                  className="form-control text-center mx-auto" 
                  style={{ maxWidth: '90px' }} 
                />
              </div>

              <div className="col-6 col-md-3">
                <label htmlFor="detective-count" className="form-label">Detective / Sheriff</label>
                <input 
                  type="number" 
                  id="detective-count" 
                  name="detective" 
                  min="0" 
                  max="5" 
                  defaultValue="1" 
                  className="form-control text-center mx-auto" 
                  style={{ maxWidth: '90px' }} 
                />
              </div>

              <div className="col-6 col-md-3">
                <label htmlFor="villager-count" className="form-label">Town / Villagers</label>
                <input 
                  type="number" 
                  id="villager-count" 
                  name="villager" 
                  min="1" 
                  max="20" 
                  defaultValue="4" 
                  className="form-control text-center mx-auto" 
                  style={{ maxWidth: '90px' }} 
                />
              </div>
            </fieldset>
            <button type="submit" className="btn btn-danger w-100 fw-semibold py-2 fs-5">Start Game</button>
          </form>
        </div>
      </section>
    </main>
  );
}