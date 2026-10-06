import React from 'react';

export function Game() {
  return (
    <main className="container-fluid flex-grow-1">
      {/* Phase & Room Header Banner */}
      <div className="d-flex justify-content-between align-items-center bg-black bg-opacity-40 border border-secondary rounded p-3 mb-4 shadow-sm">
        <div>
          <h1 className="h4 mb-0 fw-bold">Game Room: <span className="text-success">Active</span></h1>
          <small className="text-white-50">Room Code: #8492</small>
        </div>
        <div>
          <span className="badge bg-warning text-dark fs-6 px-3 py-2 border border-light-subtle shadow-sm">
            ☀️️ Daytime Phase
          </span>
        </div>
      </div>

      {/* Secret Role Reveal */}
      <section id="role-reveal" className="card bg-dark text-light border-secondary shadow p-4 mb-4 text-center">
        <h2 className="h5 text-uppercase tracking-wide text-white-50 mb-1">Your Secret Role</h2>
        <p className="small text fst-italic mb-3">Keep your screen hidden from others!</p>

        <div className="card-container mx-auto p-4 border border-secondary rounded bg-black bg-opacity-50 shadow-sm">
          <button type="button" className="btn btn-outline-warning btn-sm mb-3 px-3 py-2 role-toggle-btn">
            👁️ Tap to Reveal Card <i>(not functional yet)</i>
          </button>

          <div className="revealed-role mt-2">
            <div className="text-uppercase small text-white-50 mb-1">You are a</div>
            <h3 className="display-5 fw-bold text-danger mb-2">Werewolf 🐺</h3>
            <p className="card-text text-white-50 fs-6 mb-0">
              <strong>Goal:</strong> Eliminate the town without getting caught.
            </p>
          </div>
        </div>

        {/* ROLE REFERENCE GUIDE */}
        <div className="border border-secondary rounded p-3 bg-black bg-opacity-40 mb-4">
          <h4 className="h6 text-white-50 text-uppercase fw-bold mb-3 border-bottom border-secondary pb-2">
            Role Guide (for later reference)
          </h4>
          <div className="row g-2 text-start small">
            <div className="col-6 col-md-3">
              <div className="p-2 border border-secondary rounded bg-dark">
                <div className="fw-bold text-danger">Werewolf 🐺</div>
                <div className="text-white-50 extra-small">Eliminate the town without getting caught.</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2 border border-secondary rounded bg-dark">
                <div className="fw-bold text-info">Seer 🔮</div>
                <div className="text-white-50 extra-small">Inspect 1 player each night to learn their role.</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2 border border-secondary rounded bg-dark">
                <div className="fw-bold text-success">Doctor 🩺</div>
                <div className="text-white-50 extra-small">Protect 1 player each night from attack.</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-2 border border-secondary rounded bg-dark">
                <div className="fw-bold text-light">Villager 🙋</div>
                <div className="text-white-50 extra-small">Find and vote out all Werewolves.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* 1. NARRATOR VIEW */}
      <section id="narrator-view" className="card bg-dark text-light border-secondary shadow p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
          <h2 className="h4 mb-0">Narrator Controls</h2>
          <span className="badge bg-secondary">Host View</span>
        </div>

        {/* Game Progression Buttons (Stacked Vertically) */}
        <div className="mb-4">
          <label className="form-label text-white-50 small fw-bold text-uppercase">Phase Actions</label>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-outline-info py-2 fw-semibold">Advance to Night 🌙</button>
            <button type="button" className="btn btn-outline-warning py-2 fw-semibold">Advance to Day ☀️</button>
            <button type="button" className="btn btn-outline-danger py-2 fw-semibold">Advance to Voting 🗳️</button>
          </div>
        </div>

        <h3 className="h5 mb-3 border-bottom border-secondary pb-2">Manual Actions</h3>

        {/* Seer Tool for Narrator */}
        <form action="game.html" method="get" className="mb-3">
          <label htmlFor="seer-check" className="form-label text-white-50 small">Seer Investigation:</label>
          <div className="input-group">
            <select id="seer-check" name="seer-check" className="form-select bg-dark text-light border-secondary" defaultValue="">
              <option value="">Select target player...</option>
              <option value="john">John</option>
              <option value="sarah">Sarah</option>
              <option value="mike">Mike</option>
            </select>
            <button type="submit" className="btn btn-info fw-bold px-4">Inspect Role</button>
          </div>
        </form>

        {/* Role Result Display */}
        <div className="alert alert-info py-2 px-3 small mb-4" role="alert">
          <em>Inspected Role Result (example): Sarah is a Werewolf</em>
        </div>

        {/* Eliminate Player Tool for Narrator */}
        <form action="game.html" method="get">
          <label htmlFor="kill-player" className="form-label text-white-50 small">Eliminate Player:</label>
          <div className="input-group">
            <select id="kill-player" name="eliminated" className="form-select bg-dark text-light border-secondary" defaultValue="">
              <option value="" disabled>Select a player...</option>
              <option value="player1">John</option>
              <option value="player2">Sarah</option>
              <option value="player3">Mike</option>
            </select>
            <button type="submit" className="btn btn-danger fw-bold px-4">Eliminate</button>
          </div>
        </form>
      </section>

      <hr />

      {/* 2. ALIVE PLAYER VIEW */}
      <section id="alive-view" className="card bg-dark text-light border-secondary shadow p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
          <h2 className="h4 mb-0">Daytime Voting</h2>
          <span className="badge bg-danger fs-6 px-3 py-2 border border-light-subtle shadow-sm">
            <time dateTime="PT45S">00:45</time>
          </span>
        </div>

        <p className="text-white-50 small mb-3">
          Select a player to cast your vote for elimination:<br />
          <span className="fst-italic text-white-50">(WebSocket list of players will update live)</span>
        </p>

        {/* Voting Buttons */}
        <form action="game.html" method="get" className="mb-4">
          <div className="d-grid gap-2 d-sm-flex flex-wrap">
            <button type="submit" name="vote" value="player1" className="btn btn-outline-light flex-fill py-2 fw-semibold">John</button>
            <button type="submit" name="vote" value="player2" className="btn btn-outline-light flex-fill py-2 fw-semibold">Sarah</button>
            <button type="submit" name="vote" value="player3" className="btn btn-outline-light flex-fill py-2 fw-semibold">Mike</button>
            <button type="submit" name="vote" value="player0" className="btn btn-outline-secondary flex-fill py-2 fw-semibold">SKIP VOTE</button>
          </div>
        </form>

        {/* Real-Time Live Tally Box */}
        <div id="live-tally" className="border border-secondary rounded p-3 bg-black bg-opacity-40">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="h6 mb-0 text-uppercase tracking-wide text-white-50">Live Tally</h3>
            <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 small">
              (WebSocket Realtime)
            </span>
          </div>

          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0 py-2">
              <span><strong>John</strong> <span className="text-white-50 small ms-1">(Mike, Sarah)</span></span>
              <span className="badge bg-danger rounded-pill">2 votes</span>
            </li>
            <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0 py-2">
              <span><strong>Sarah</strong> <span className="text-white-50 small ms-1">(John)</span></span>
              <span className="badge bg-warning text-dark rounded-pill">1 vote</span>
            </li>
            <li className="list-group-item bg-transparent text-light border-0 d-flex justify-content-between align-items-center px-0 py-2">
              <span><strong>Mike</strong></span>
              <span className="badge bg-secondary rounded-pill">0 votes</span>
            </li>
          </ul>
        </div>
      </section>

      <hr />

      {/* 3. DEAD / ELIMINATED PLAYER VIEW */}
      <section id="dead-view" className="card bg-dark text-light border-danger shadow-lg p-4 p-md-5 mb-4 text-center">
        <div className="py-4 py-md-5">
          {/* Eerie Skull Icon */}
          <div className="mb-3">
            <img src="skull_icon.png" className="skull-icon" alt="Eliminated player skull icon" />
          </div>

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
                  <span className="fw-bold text-light">Werewolf 🐺</span>
                  <span className="text-white-50 small">Eliminated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </main>
  );
}