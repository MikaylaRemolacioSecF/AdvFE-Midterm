import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PickPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const router = useRouter();

  // Fetch Pokémon and types on page load
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch pokemon list 
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200"); //Higher limit makes it loading slower
        const data = await response.json();
        
        // Fetch detailed Pokémon data (to get type)
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t) => t.type.name),
            };
          })
        );

        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    async function fetchTypes() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    }

    fetchData();
    fetchTypes();
  }, []);

  // Filter Pokémon by type
  const handleTypeFilter = (type) => {
    setSelectedType(type);
    if (type === "all") {
      setFilteredPokemon(pokemonList);
    } else {
      setFilteredPokemon(pokemonList.filter((pokemon) => pokemon.types.includes(type)));
    }
  };

  // Handle Pokémon selection
  const handleSelect = (pokemon) => {
    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
    router.push("/"); // Redirect to Home page
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: '#B6D0E2', color:'blue' }}>
        <h1>Pick Your Pokémon</h1>
        <p>Filter Pokémon by type and select your starter!</p><br />

        {/* Filter Section */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {/* Dropdown to filter by type */}
            <select 
              onChange={(e) => handleTypeFilter(e.target.value)} 
              value={selectedType} 
              style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', backgroundColor: 'yellow', border: '2px blue solid', color: 'blue' }}
            >
                <option value="all">All Types</option>
                {types.map((type) => (
                <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
                ))}
            </select>
        </div>

        {/* Pokémon Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 10vw)", gap: "20px", justifyContent: "center" }}>
            {filteredPokemon.map((pokemon) => (
            <div
                key={pokemon.id}
                style={{
                border: "2px solid black",
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease",
                }}
                onClick={() => handleSelect(pokemon)}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
                <p><strong>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</strong></p>
                <p>Types: {pokemon.types.join(", ")}</p>
            </div>
            ))}
        </div>
    </div>
  );
}
