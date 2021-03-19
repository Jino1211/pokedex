import React from "react";

export default function PokemonsByType({
  pokemonListByType,
  getPokemonDetails,
}) {
  return (
    <div className="div-pokemon-types">
      <li className="pokemon-list-by-type" onClick={getPokemonDetails}>
        <img src={pokemonListByType.src} className="img-list"></img>
        {pokemonListByType.name}
      </li>
    </div>
  );
}
