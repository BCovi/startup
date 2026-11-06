import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  // State for username/email input
  const [userNameInput, setUserNameInput] = useState('');
  // State for password input
  const [password, setPassword] = useState('');
  // State to track whether the user clicked Login or Create Account
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  // State for error messages
  const [displayError, setDisplayError] = useState(null);
  // State for the currently authenticated user loaded from localStorage
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // Start with an empty array so it proves the backend fetch is working
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Hook into backend authentication endpoints
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!userNameInput || !password) return;

    const endpoint = isCreatingAccount ? '/api/auth/create' : '/api/auth/login';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userNameInput, password: password }),
      });

      if (response.status === 200) {
        localStorage.setItem('userName', userNameInput);
        setUserName(userNameInput);
        setDisplayError(null);
      } else {
        const body = await response.json();
        setDisplayError(`⚠️ Error: ${body.msg}`);
      }
    } catch (err) {
      setDisplayError('⚠️ Network error connecting to backend.');
    }
  };

  // Hook into backend logout endpoint
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'DELETE' });
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('userName');
      setUserName('');
      setUserNameInput('');
      setPassword('');
    }
  };

  // Fetch leaderboard data from backend on load
  // Fetch leaderboard data from the backend service on load
  useEffect(() => {
    fetch('/api/stats')
      .then((res) => {
        if (res.status === 200) return res.json();
        return [];
      })
      .then((data) => {
        setLeaderboardData(data);
      })
      .catch(() => {
        setDisplayError('⚠️ Unable to load leaderboard data from the server.');
      });
  }, []);

  return (
    <main>
      {/* <!-- Login / Auth Section --> */}
      <section id="authentication" className="container my-5 d-flex justify-content-center">
        <div className="card shadow-sm border-secondary p-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
          <h3 className="mb-3">{!userName ? 'Welcome to Nightfall' : 'Player Portal'}</h3>
          
          {displayError && <div className="alert alert-danger py-2">{displayError}</div>}

          {!userName ? (
            <form onSubmit={handleAuth}>
              <div className="mb-3 text-start">
                <label htmlFor="userName" className="form-label">Email / Username:</label>
                <input 
                  type="text" 
                  className="form-control"
                  id="userName" 
                  placeholder="your@email.com" 
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="password" className="form-label">Password:</label>
                <input 
                  type="password" 
                  className="form-control"
                  id="password" 
                  placeholder="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="d-flex gap-2 justify-content-center my-3">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4"
                  onClick={() => setIsCreatingAccount(false)}
                >
                  Login
                </button>
                <button 
                  type="submit" 
                  className="btn btn-outline-secondary"
                  onClick={() => setIsCreatingAccount(true)}
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h4 className="text-success mb-3">Welcome back, {userName}!</h4>
              <div className="d-flex gap-2 justify-content-center my-3">
                <button className="btn btn-primary px-4" onClick={() => navigate('/lobby')}>
                  Go to Lobby
                </button>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <hr/>

      {/* <!-- Global Leaderboard Section --> */}
      <section id="global-leaderboard" className="container my-5">
        <div className="card shadow-sm border-secondary p-4">
          <h3 className="mb-2 text-center">Global Leaderboard</h3>
          <p className="text-white-50 text-center mb-1">
            Top players across all hosted matches (Pulled from Database) [Database Place Holder]:
          </p>
          <p className="text-white-50 small text-center mb-4">
            <i>(Example table of data below)</i>
          </p>
          
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
                {leaderboardData.length > 0 ? (
                  leaderboardData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.rank || index + 1}</td>
                      <td>{row.player || row.email}</td>
                      <td>{row.winRate || 'N/A'}</td>
                      <td>{row.wins || 0}</td>
                      <td>{row.role || 'Player'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white-50 py-3">
                      No match stats recorded on the server yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}