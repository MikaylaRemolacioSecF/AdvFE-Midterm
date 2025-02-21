import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [trainer, setTrainer] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Load trainer info from localStorage
  useEffect(() => {
    const savedTrainer = JSON.parse(localStorage.getItem("trainer"));
    if (savedTrainer) {
      setTrainer(savedTrainer);
    }

    const savedPokemon = JSON.parse(localStorage.getItem("selectedPokemon"));
    if (savedPokemon) {
      setSelectedPokemon(savedPokemon);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#B6D0E2", minHeight: "100vh", padding: "20px", color: "blue" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "blue" }}>Welcome, Pokémon Trainer!</h1>
        <h3>Let's get you started on your Pokémon journey!</h3>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Trainer Profile</h2>
        {trainer ? <ShowInfo trainer={trainer} /> : <p>No trainer info yet.</p>}

        <Link href="/trainerSetup">
          <button style={{ padding: "10px", margin: "10px", cursor: "pointer", color: "blue", backgroundColor: "yellow", border: "2px blue solid" }}>
            Edit Trainer Information
          </button>
        </Link>

        <h2>Your Pokémon</h2>
        {selectedPokemon ? (
          <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`} alt={selectedPokemon.name} />
            <p><strong>{selectedPokemon.name.toUpperCase()}</strong></p>
          </div>
        ) : (
          <p>No Pokémon selected.</p>
        )}

        <Link href="/pickPokemon">
          <button style={{ padding: "10px", margin: "10px", cursor: "pointer", color: "blue", backgroundColor: "yellow", border: "2px blue solid" }}>
            Pick Your Pokémon
          </button>
        </Link>
      </div>
    </div>
  );
}

// Show trainer information
function ShowInfo({ trainer }) {
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <p><strong>Name:</strong> {trainer.name}</p>
      <p><strong>Age:</strong> {trainer.age}</p>
    </div>
  );
}
