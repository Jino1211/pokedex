import React from "react";

export default function pokemonDetails({ pokemon, srcImg, setSrcImg }) {
  const flipPokemon = () => {
    if (srcImg === pokemon.data.sprites.back_default) {
      setSrcImg(pokemon.data.sprites.front_default);
    } else {
      setSrcImg(pokemon.data.sprites.back_default);
    }
  };

  return (
    <div className="div-pokemon-details">
      <ul className="ul-pokemon-details">
        <li className="li-pokemon-details">Name: {pokemon.data.name}</li>
        <li className="li-pokemon-details">Height: {pokemon.data.height}</li>
        <li className="li-pokemon-details">Weight: {pokemon.data.weight}</li>
        <li className="li-pokemon-details">Types: {pokemon.data.types}</li>
      </ul>
      <img
        className="pokemon-img"
        src={srcImg}
        onMouseOver={flipPokemon}
        onMouseLeave={flipPokemon}
      />
    </div>
  );
}
