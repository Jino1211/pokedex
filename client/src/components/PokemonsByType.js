import React from "react";

export default function PokemonsByType({ pokemonListByType }) {
  return (
    <div className="div-pokemon-types">
      <li className="pokemon-list-by-type">{pokemonListByType.name}</li>
    </div>
  );
}
