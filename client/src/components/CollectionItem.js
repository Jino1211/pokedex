import React from "react";

export default function CollectionItem({ pokemonName }) {
  return <div className="pokemon-collection-item">{pokemonName.name}</div>;
}
