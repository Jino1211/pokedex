import React from "react";

export default function PokemonsByType({
  pokemonListByType,
  getPokemonDetails,
}) {
  return (
    <div className="div-pokemon-types">
      <li className="pokemon-list-by-type">
        <img src={pokemonListByType.src} className="img-list"></img>
        <span onClick={getPokemonDetails}>{pokemonListByType.name}</span>
      </li>
    </div>
  );
}
