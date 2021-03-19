import React from "react";
import CollectionItem from "./CollectionItem";

export default function PokemonCollection({ caught }) {
  const temp = caught[0] ? caught[0] : [];
  return temp.map((itemCollection, i) => (
    <CollectionItem key={`collectionItem-${i}`} pokemonName={itemCollection} />
  ));
}
