import React from "react";
import { useState } from "react";

export default function CollectionItem({ pokemonName }) {
  const [bool, setBool] = useState(true);
  const showData = () => {
    if (bool) {
      setBool(false);
    } else {
      setBool(true);
    }
  };
  let pokemonTypes = "";
  pokemonName.types.forEach((type) => {
    pokemonTypes = `${pokemonTypes}  ${type}`;
  });
  return (
    <div className="pokemon-collection-item" onClick={showData}>
      {pokemonName.name}
      <span className="pokemon-data" hidden={bool}>
        - Id: {pokemonName.id}, Height: {pokemonName.height}, Weight:{" "}
        {pokemonName.weight}, Types: {pokemonTypes}
      </span>
    </div>
  );
}
