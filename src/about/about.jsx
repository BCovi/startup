import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container my-5 flex-grow-1" style={{ maxWidth: '850px' }}>
      {/* Application Description */}
      <section id="about-game" className="card bg-dark text-light border-secondary shadow-sm p-4 mb-4">
        <h1 className="display-6 mb-3 border-bottom border-secondary pb-2">About Nightfall</h1>
        <p className="lead">
          Nightfall is a digital game manager for social deduction games like Mafia and Werewolf.
        </p>
        
        {/* Responsive Forest Banner Image */}
        <div className="banner-container text-center my-3">
          <img 
            src="/forest_main.jpg" 
            alt="Nightfall full moon over a spooky forest" 
            className="img-fluid rounded shadow border border-secondary hero-img"
          />
        </div>
        
        <p className="text-white-50 fs-5 mt-2 mb-0">
          Gather your friends, have everyone join the same digital room on their phones, and let the app handle the heavy lifting. Nightfall automatically distributes secret roles, coordinates night actions, and tallies daytime votes. No physical cards, no peeking, and no confusion.
        </p>
      </section>

      <hr />

      {/* 3rd Party API Section */}
      <section id="api-placeholder" className="card bg-dark text-light border-secondary shadow-sm p-4">
        <h2 className="h3 mb-3 border-bottom border-secondary pb-2">Dynamic Player Avatars (3rd-Party API)</h2>
        <p className="text-white-50">
          To give every player a unique identity, Nightfall uses the DiceBear API. 
          When you create an account, the API generates a unique, customized avatar based on your username. These will be used on leaderboards and throughout gameplay for added visual flair.
        </p>
        
        {/* Live Avatar Preview Box */}
        <div className="bg-black bg-opacity-25 border border-secondary rounded p-4 text-center my-2">
          <p className="small text-white-50 mb-3"><i>Sample API avatar call:</i></p>
          <figure className="mb-0">
            <img 
              src="https://api.dicebear.com/10.x/shadows/svg?seed=Braden" 
              alt="Braden Avatar" 
              className="img-fluid avatar-preview"
              style={{ width: '120px', height: '120px' }}
            />
            <figcaption className="mt-2 text-warning fw-semibold">Avatar Seed: "Braden"</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}