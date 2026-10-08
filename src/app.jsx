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
      {/* 1. Added flexbox classes (d-flex flex-column min-vh-100) to force the footer to the bottom of the screen */}
      <div className="app bg-dark text-light d-flex flex-column min-vh-100">
        
      <header className="sticky-top">
        <nav id="main-nav" className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <div className="container-fluid">
            {/* 1. Changed <a> to <NavLink> and href to 'to' */}
            <NavLink className="navbar-brand" to="/">Nightfall</NavLink>
          
            <div className="navbar-nav ms-auto flex-row gap-3">
              {/* 2. Removed the hardcoded 'active' class (NavLink adds it automatically when you are on that page!) */}
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="lobby">Lobby</NavLink>
              <NavLink className="nav-link" to="game">Game</NavLink>
              <NavLink className="nav-link" to="about">About</NavLink>
            </div>
          </div>
        </nav>
      </header>

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className=" bg-dark text-white-50 py-3 mt-auto">
          <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
            <span>Braden Covington</span>
            <a href="https://github.com/BCovi/startup" className="text-white-50 text-decoration-underline" target="_blank">
              Source
            </a>
          </div>
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid text-center flex-grow-1">404: Unknown Route</main>;
}