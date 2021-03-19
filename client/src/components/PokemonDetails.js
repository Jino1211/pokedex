import React from "react";

export default function pokemonDetails({
  pokemon,
  srcImg,
  setSrcImg,
  getPokemonsType,
  hidden,
  addToCollection,
}) {
  //Function to flip the Pokemon img on mouse hover

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
        <li className="li-pokemon-details">
          Types:{" "}
          {pokemon.data.types
            ? pokemon.data.types.map((type, i) => (
                <span
                  key={`type-${i}`}
                  className="type"
                  onClick={getPokemonsType}
                >
                  {type}{" "}
                </span>
              ))
            : ""}
        </li>
      </ul>
      <img
        className="pokemon-img"
        src={srcImg}
        onMouseOver={flipPokemon}
        onMouseLeave={flipPokemon}
      />
      <button hidden={hidden} onClick={addToCollection}>
        {" "}
        button
      </button>
    </div>
  );
}
