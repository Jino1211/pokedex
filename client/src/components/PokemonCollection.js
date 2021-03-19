import React from "react";
import CollectionItem from "./CollectionItem";

export default function PokemonCollection({ collection }) {
  const temp = collection[0] ? collection[0] : [];
  return temp.map((itemCollection, i) => (
    <CollectionItem key={`collectionItem-${i}`} pokemonName={itemCollection} />
  ));
}
