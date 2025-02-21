import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{backgroundColor: '#B6D0E2'}}>
      <div style={{textAlign: 'center'}}>
        <h1 style={{color: 'yellow', }}>Welcome Pokemon Trainer!</h1>
        <h3>Let's get you started on your Pokemon journey!</h3>
      </div>
      <div>

      </div>
        <h2>Trainer Profile</h2>
        <trainerSetup href='trainerSetup'>
          <Link href="/trainerSetup">
            <button>Click here to make changes to your trainer profile!</button>
          </Link>
        </trainerSetup>
        <h2>Pick Your Pokemon</h2>
        <pickPokemon href='pickPokemon'>
          <Link href="/pickPokemon">
            <button>Click here to choose your Pokemon!</button>
          </Link>
        </pickPokemon>
      </div>
      
    
  );
}