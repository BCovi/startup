import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Home } from './home/home';
import { Lobby } from './lobby/lobby';
import { Game } from './game/game';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">Nightfall</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="lobby">Lobby</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="game">Game</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="about">About</NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Braden Covington</span>
            <a href="https://github.com/bcovington03/startup" className="text-reset">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid text-center">404: Unknown Route</main>;
}