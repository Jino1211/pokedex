import React from "react";

export default function pokemonDetails({ pokemon }) {
  return (
    <div>
      <ul className="ul-pokemon-details">
        <li>Name: {pokemon.data.name}</li>
        <li>Height: {pokemon.data.height}</li>
        <li>Weight: {pokemon.data.weight}</li>
        <li>Types: {pokemon.data.types}</li>
      </ul>
    </div>
  );
}
