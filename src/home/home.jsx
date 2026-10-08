import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/lobby');
  };

  return (
    <main>
      {/* <!-- Login Placeholder Requirement --> */}
      <section id="authentication" className="container my-5 d-flex justify-content-center">
        <div className="card shadow-sm border-secondary p-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
          <h3 className="mb-3">Login to Play</h3>
          <form onSubmit={handleAuth}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Email:</label>
              <input 
                type="email" 
                className="form-control"
                id="email" 
                name="email" 
                placeholder="player@email.com" 
                required 
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Password:</label>
              <input 
                type="password" 
                className="form-control"
                id="password" 
                name="password" 
                placeholder="password" 
                required 
              />
            </div>
            <div className="d-flex gap-2 justify-content-center my-3">
              <button type="submit" className="btn btn-primary px-4">Login</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/lobby')}>
                Create Account
              </button>
            </div>
          </form>
          {/* <!-- User Name Display Requirement (Simulated logged-in state) --> */}
          <p className="text-muted small mb-0"><em>(Once authenticated, this will display: "Welcome back, User!")</em></p>
        </div>
      </section>

      <hr/>

      {/* <!-- Database Data Placeholder Requirement --> */}
      <section id="global-leaderboard" className="container my-5">
        <div className="card shadow-sm border-secondary p-4">
          <h3 className="mb-2 text-center">Global Leaderboard</h3>
          <p className="text-white-50 text-center mb-1">
            Top players across all hosted matches (Pulled from Database) [Database Place Holder]:
          </p>
          <p className="text-white-50 small text-center mb-4">
            <i>(Example table of data below)</i>
          </p>
          
          {/* //Table mean to scroll to fit all the columns. */}
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover align-middle text-nowrap mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col">Win Rate</th>
                  <th scope="col">Total Wins</th>
                  <th scope="col">Most Played Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Braden</td>
                  <td>65%</td>
                  <td>28</td>
                  <td>Werewolf</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Sarah</td>
                  <td>55%</td>
                  <td>21</td>
                  <td>Seer</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mike</td>
                  <td>40%</td>
                  <td>12</td>
                  <td>Villager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}