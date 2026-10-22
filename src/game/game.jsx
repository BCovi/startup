import React, { useState, useEffect } from 'react';
import './game.css';

export function Game() {
  const [isNarrator, setIsNarrator] = useState(false); // Set to true to view host controls
  const [phase, setPhase] = useState('Day Phase ☀️');
  const [role, setRole] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [seerTarget, setSeerTarget] = useState('');
  const [seerResult, setSeerResult] = useState('');
  const [eliminateTarget, setEliminateTarget] = useState('');
  const [eliminatedNotice, setEliminatedNotice] = useState('');
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
  const [winner, setWinner] = useState(null); // Track game over win state
  
  const allPlayers = ['John', 'Sarah', 'Mike'];
  const alivePlayers = allPlayers.filter(player => !eliminatedPlayers.includes(player));

  // Voting states
  const [votes, setVotes] = useState({ John: 0, Sarah: 0, Mike: 0, Skip: 0 });
  const [userVote, setUserVote] = useState(null);
  const [votingOpen, setVotingOpen] = useState(false);
  const [votingClosed, setVotingClosed] = useState(false);

  // Check if current user is dead
  const isDead = eliminatedPlayers.includes('You');

  // Fixed roles for mock players to evaluate win conditions
  const playerRoles = {
    John: 'Villager',
    Sarah: 'Werewolf',
    Mike: 'Doctor'
  };

  // Win condition checker
  const checkWinCondition = (currentEliminated) => {
    const allPlayerRoles = {
      ...playerRoles,
      You: role?.name
    };

    // Check alive Werewolves
    const werewolves = Object.keys(allPlayerRoles).filter(p => allPlayerRoles[p] === 'Werewolf');
    const aliveWerewolves = werewolves.filter(w => w === 'You' ? !currentEliminated.includes('You') : !currentEliminated.includes(w));

    if (aliveWerewolves.length === 0) {
      setWinner('Town 🏆 (All Werewolves eliminated!)');
      return;
    }

    // Check alive Town members
    const aliveTown = Object.keys(allPlayerRoles).filter(p => allPlayerRoles[p] !== 'Werewolf' && (p === 'You' ? !currentEliminated.includes('You') : !currentEliminated.includes(p)));

    if (aliveWerewolves.length >= aliveTown.length) {
      setWinner('Werewolves 🐺 (They have overtaken the town!)');
      return;
    }
  };

  // Reset Game handler to avoid full page reloads
  const resetGame = () => {
    setWinner(null);
    setEliminatedPlayers([]);
    setPhase('Day Phase ☀️');
    setUserVote(null);
    setVotes({ John: 0, Sarah: 0, Mike: 0, Skip: 0 });
    setIsRevealed(false);
  };

  // Voting handler
  const handleVote = (target) => {
    if (votingClosed || userVote) return;
    setVotes(prev => ({ ...prev, [target]: prev[target] + 1 }));
    setUserVote(target);
  };

  const handleInspect = () => {
    if (!seerTarget) return;
    const mockRoles = { John: 'Villager 🙋', Sarah: 'Werewolf 🐺', Mike: 'Doctor 🩺' };
    setSeerResult(`${seerTarget} is a ${mockRoles[seerTarget] || 'Villager 🙋'}`);
  };

  const handleEliminate = () => {
    if (!eliminateTarget) return;
    setEliminatedNotice(`⚡ ${eliminateTarget} has been eliminated from the game!`);
    
    const updatedEliminated = [...eliminatedPlayers, eliminateTarget];
    if (!eliminatedPlayers.includes(eliminateTarget)) {
      setEliminatedPlayers(updatedEliminated);
    }

    // Evaluate if game is over
    checkWinCondition(updatedEliminated);
    
    setEliminateTarget('');
  };

  // Randomly assign a role on initial component mount
  useEffect(() => {
    const roles = [
      { name: 'Werewolf', icon: '🐺', color: 'text-danger', goal: 'Eliminate the town without getting caught.' },
      { name: 'Seer', icon: '🔮', color: 'text-info', goal: 'Inspect one player each night to learn their role.' },
      { name: 'Doctor', icon: '🩺', color: 'text-success', goal: 'Protect one player each night from attack.' },
      { name: 'Villager', icon: '🙋', color: 'text-light', goal: 'Find and vote out all Werewolves.' }
    ];
    
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    setRole(randomRole);
  }, []);

  return (
    <main className="container-fluid flex-grow-1">
      {/* Quick Test Toggle for Grading / Development */}
      <div className="bg-dark border border-secondary rounded p-2 mb-3 d-flex justify-content-between align-items-center">
        <span className="small text-white-50">🧪 Quick View Toggle (for testing):</span>
        <div>
          <button 
            className={`btn btn-sm me-2 ${!isNarrator && !isDead ? 'btn-light fw-bold' : 'btn-outline-secondary'}`}
            onClick={() => { setIsNarrator(false); setEliminatedPlayers([]); setWinner(null); }}
          >
            👤 Alive Player View
          </button>
          <button 
            className={`btn btn-sm me-2 ${isNarrator ? 'btn-warning fw-bold' : 'btn-outline-secondary'}`}
            onClick={() => setIsNarrator(true)}
          >
            📋 Narrator View
          </button>
          <button 
            className={`btn btn-sm ${!isNarrator && isDead ? 'btn-danger fw-bold' : 'btn-outline-secondary'}`}
            onClick={() => { setIsNarrator(false); setEliminatedPlayers(['You']); }}
          >
            💀 Dead Player View
          </button>
        </div>
      </div>

      {/* GAME OVER BANNER */}
      {winner && (
        <div className="card bg-dark text-warning border-warning shadow-lg p-5 mb-4 text-center">
          <h2 className="display-4 fw-bold text-uppercase mb-3">Game Over</h2>
          <div className="fs-3 mb-4">Winner: <strong>{winner}</strong></div>
          <div>
            <button 
              className="btn btn-warning fw-bold px-4 py-2"
              onClick={resetGame}
            >
              Play Again 🔄
            </button>
          </div>
        </div>
      )}

      {/* Phase & Room Header Banner */}
      <div className="d-flex justify-content-between align-items-center bg-black bg-opacity-40 border border-secondary rounded p-3 mb-4 shadow-sm">
        <div>
          <h1 className="h4 mb-0 fw-bold">Game Room: <span className="text-success">Active</span></h1>
          <small className="text-white-50">Room Code: #8492</small>
        </div>
        <div>
          <span className={`badge fs-6 px-3 py-2 border border-light-subtle shadow-sm ${
            phase.includes('Night') ? 'bg-info text-dark' :
            phase.includes('Voting') ? 'bg-danger text-white' :
            'bg-warning text-dark'
          }`}>
            {phase}
          </span>
        </div>
      </div>

      {/* ALIVE PLAYER: Secret Role Reveal & Reference Guide */}
      {!isNarrator && !isDead && (
        <section id="role-reveal" className="card bg-dark text-light border-secondary shadow p-4 mb-4 text-center">
          <h2 className="h5 text-uppercase tracking-wide text-white-50 mb-1">Your Secret Role</h2>
          <p className="small text fst-italic mb-3">Keep your screen hidden from others!</p>

          <div className="card-container mx-auto p-4 border border-secondary rounded bg-black bg-opacity-50 shadow-sm secret-role-container">
            {/* Button View Panel */}
            <div className={`secret-role-panel ${isRevealed ? 'button-panel-hidden' : 'secret-role-panel-visible'}`}>
              <button 
                type="button" 
                className="btn btn-outline-warning py-3 fw-bold fs-5 w-100 role-toggle-btn"
                onClick={() => setIsRevealed(true)}
              >
                👁️ Tap to Reveal Card
              </button>
            </div>

            {/* Revealed Role Details Panel */}
            <div className={`revealed-role mt-2 secret-role-panel ${isRevealed ? 'secret-role-panel-visible' : 'details-panel-hidden'}`}>
              <div className="text-uppercase small text-white-50 mb-1">You are a</div>
              <h3 className={`display-5 fw-bold ${role?.color || 'text-danger'} mb-2`}>
                {role?.name} {role?.icon}
              </h3>
              <p className="card-text text-white-50 fs-6 mb-3">
                <strong>Goal:</strong> {role?.goal}
              </p>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => setIsRevealed(false)}
              >
                Hide Card
              </button>
            </div>
          </div>

          {/* ROLE REFERENCE GUIDE */}
          <div className="border border-secondary rounded p-3 bg-black bg-opacity-40 mb-4 mt-4">
            <h4 className="h6 text-white-50 text-uppercase fw-bold mb-3 border-bottom border-secondary pb-2">
              Role Guide (for later reference)
            </h4>
            <div className="row g-2 text-start small">
              <div className="col-6 col-md-3">
                <div className="p-2 border border-secondary rounded bg-dark h-100 d-flex flex-column justify-content-between">
                  <div className="fw-bold text-light">Villager 🙋</div>
                  <div className="text-white-50 extra-small mt-1">Find and vote out all Werewolves.</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-2 border border-secondary rounded bg-dark h-100 d-flex flex-column justify-content-between">
                  <div className="fw-bold text-danger">Werewolf 🐺</div>
                  <div className="text-white-50 extra-small mt-1">Eliminate the town without getting caught.</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-2 border border-secondary rounded bg-dark h-100 d-flex flex-column justify-content-between">
                  <div className="fw-bold text-success">Doctor 🩺</div>
                  <div className="text-white-50 extra-small mt-1">Protect one player each night from attack.</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-2 border border-secondary rounded bg-dark h-100 d-flex flex-column justify-content-between">
                  <div className="fw-bold text-info">Seer 🔮</div>
                  <div className="text-white-50 extra-small mt-1">Inspect one player each night to learn their role.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NARRATOR VIEW */}
      {isNarrator && (
        <section id="narrator-view" className="card bg-dark text-light border-secondary shadow p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
            <h2 className="h4 mb-0">Narrator Controls</h2>
            <span className="badge bg-secondary">Host View</span>
          </div>

          <div className="mb-3 d-flex align-items-center justify-content-between px-3 py-2 bg-dark border border-secondary rounded">
            <span className="text-white-50 small">Current Phase:</span>
            <span className={`badge fs-6 px-3 py-2 ${
              phase.includes('Night') ? 'bg-info text-dark' :
              phase.includes('Voting') ? 'bg-danger text-white' :
              'bg-warning text-dark'
            }`}>
              {phase}
            </span>
          </div>

          <div>
            <div className="fw-bold text-uppercase small mb-2 text-white-50">Phase Actions</div>
            <div className="d-grid gap-2 mb-4">
              <button 
                type="button" 
                className={`py-2 fw-bold btn ${phase.includes('Day') ? 'btn-outline-info border-3 shadow-sm' : 'btn-outline-info opacity-75'}`}
                onClick={() => {
                  setPhase('Night Phase 🌙');
                  setVotingOpen(false);
                  setUserVote(null);
                  setVotes({ John: 0, Sarah: 0, Mike: 0, Skip: 0 });
                }}
              >
                Advance to Night 🌙 {phase.includes('Day') && <span className="badge bg-info text-dark ms-2">Next ➔</span>}
              </button>
              
              <button 
                type="button" 
                className={`py-2 fw-bold btn ${phase.includes('Night') ? 'btn-outline-warning border-3 shadow-sm' : 'btn-outline-warning opacity-75'}`}
                onClick={() => setPhase('Daytime Phase ☀️')}
              >
                Advance to Day ☀️ {phase.includes('Night') && <span className="badge bg-warning text-dark ms-2">Next ➔</span>}
              </button>
            </div>

            <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold small text-white">Voting Status</div>
                <div className="text-white-50 small">
                  {!phase.includes('Day') ? '🔒 Closed (Night Phase)' : votingOpen ? '🟢 Voting is OPEN' : '🔴 Voting is CLOSED'}
                </div>
              </div>
              <button 
                type="button" 
                className={`btn btn-sm fw-bold ${votingOpen ? 'btn-outline-danger' : 'btn-outline-success'}`}
                disabled={!phase.includes('Day')}
                onClick={() => setVotingOpen(!votingOpen)}
              >
                {votingOpen ? 'Close Voting' : 'Open Voting'}
              </button>
            </div>
          </div>

          <h3 className="h5 mb-3 mt-4 border-bottom border-secondary pb-2">Manual Actions</h3>
          
          <form onSubmit={(e) => { e.preventDefault(); handleInspect(); }} className="mb-3">
            <label htmlFor="seer-check" className="form-label text-white-50 small">Seer Investigation:</label>
            <div className="input-group">
              <select 
                id="seer-check" 
                className="form-select bg-dark text-light border-secondary" 
                value={seerTarget}
                onChange={(e) => setSeerTarget(e.target.value)}
              >
                <option value="">Select target player...</option>
                {['John', 'Sarah', 'Mike']
                  .filter(player => !eliminatedPlayers.includes(player))
                  .map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
              </select>
              <button type="submit" className="btn btn-info fw-bold px-4">Inspect Role</button>
            </div>
          </form>

          {seerResult && (
            <div className="alert alert-info py-2 px-3 small mb-4" role="alert">
              <em>{seerResult}</em>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleEliminate(); }}>
            <label htmlFor="kill-player" className="form-label text-white-50 small">Eliminate Player:</label>
            <div className="input-group">
              <select 
                id="kill-player" 
                className="form-select bg-dark text-light border-secondary" 
                value={eliminateTarget}
                onChange={(e) => setEliminateTarget(e.target.value)}
              >
                <option value="">Select a player...</option>
                {['John', 'Sarah', 'Mike']
                  .filter(player => !eliminatedPlayers.includes(player))
                  .map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
              </select>
              <button type="submit" className="btn btn-danger fw-bold px-4">Eliminate</button>
            </div>
            <div className="form-text text-white-50 small mt-1" style={{ fontSize: '0.8rem' }}>
              💡 <em>Hold night kills until morning reveals (allows for Doctor saves & storytelling suspense).</em>
            </div>
          </form>

          {eliminatedNotice && (
            <div className="alert alert-danger py-2 px-3 small mt-3 mb-0" role="alert">
              <em>{eliminatedNotice}</em>
            </div>
          )}
        </section>
      )}

      {/* ALIVE PLAYER VOTING SECTION (Only visible during the Day) */}
      {!isNarrator && !isDead && phase.includes('Day') && (
        <section id="alive-view" className="card bg-dark text-light border-secondary shadow p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
            <h2 className="h4 mb-0">Daytime Voting</h2>
          </div>

          {!votingOpen ? (
            <div className="alert alert-warning py-2 px-3 small mb-3" role="alert">
              ⏳ <em>Discussion in progress. Waiting for the narrator to open voting...</em>
            </div>
          ) : userVote ? (
            <div className="alert alert-success py-2 px-3 small mb-3" role="alert">
              ✅ <em>You voted for: <strong>{userVote}</strong>. Waiting for results...</em>
            </div>
          ) : (
            <p className="text-white-50 small mb-3">
              Select a player to cast your vote for elimination:
            </p>
          )}

          {votingOpen && !userVote && (
            <div className="mb-4">
              <div className="d-grid gap-2 d-sm-flex flex-wrap">
                {alivePlayers.map(player => (
                  <button 
                    key={player}
                    type="button" 
                    className="btn btn-outline-light flex-fill py-2 fw-semibold"
                    onClick={() => handleVote(player)}
                  >
                    {player}
                  </button>
                ))}
                <button 
                  type="button" 
                  className="btn btn-outline-secondary flex-fill py-2 fw-semibold"
                  onClick={() => handleVote('Skip')}
                >
                  SKIP VOTE
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* SHARED LIVE TALLY BOARD (Visible to Everyone During Day) */}
      {phase.includes('Day') && (
        <div id="live-tally" className="card bg-dark text-light border-secondary shadow p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="h6 mb-0 text-uppercase tracking-wide text-white-50">Live Vote Tally</h3>
            <span className={`badge border small ${
              votingOpen 
                ? 'bg-success text-white border-success' 
                : 'bg-secondary bg-opacity-25 text-white-50 border-secondary'
            }`}>
              {votingOpen ? '🟢 Voting Open' : '🔴 Voting Closed'}
            </span>
          </div>
          <ul className="list-group list-group-flush bg-transparent">
            {[...allPlayers]
              .sort((a, b) => votes[b] - votes[a])
              .filter(player => votes[player] > 0)
              .map(player => (
                <li key={player} className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0 py-2">
                  <span>
                    <strong>{player}</strong> 
                    {eliminatedPlayers.includes(player) && <span className="text-danger small ms-1">(Eliminated)</span>}
                  </span>
                  <span className="badge bg-primary rounded-pill">{votes[player]} {votes[player] === 1 ? 'vote' : 'votes'}</span>
                </li>
            ))}

            {votes.Skip > 0 && (
              <li className="list-group-item bg-transparent text-light border-0 d-flex justify-content-between align-items-center px-0 py-2">
                <span className="text-white-50">Skip Vote</span>
                <span className="badge bg-secondary rounded-pill">{votes.Skip} {votes.Skip === 1 ? 'vote' : 'votes'}</span>
              </li>
            )}

            {allPlayers.every(p => votes[p] === 0) && votes.Skip === 0 && (
              <li className="list-group-item bg-transparent text-light border-0 text-center py-2 text-white-50 small fst-italic">
                No votes cast yet this round...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* DEAD / ELIMINATED PLAYER VIEW */}
      {!isNarrator && isDead && (
        <section id="dead-view" className="card bg-dark text-light border-danger shadow-lg p-4 p-md-5 mb-4 text-center">
          <div className="py-4 py-md-5">
            <h2 className="display-6 fw-bold text-danger text-uppercase mb-2">You Have Been Eliminated</h2>
            <div className="mb-4">
              <span className="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 px-3 py-2 fs-6">
                Spectator Mode Active
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <p className="text-white-50 fs-5 mb-4">
                  Silence! Dead players must remain quiet and may not vote or participate in town discussions.
                </p>

                {/* Past Role Reminder Card */}
                <div className="border border-secondary rounded p-3 bg-black bg-opacity-50 text-start">
                  <div className="text-white-50 small text-uppercase fw-semibold mb-1">Your Former Role</div>
                  <div className="pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
                    <span className={`fw-bold ${role?.color || 'text-light'}`}>
                      {role?.name || 'Unknown'} {role?.icon}
                    </span>
                    <span className="text-white-50 small">Eliminated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}