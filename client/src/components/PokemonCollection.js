import React from "react";
import CollectionItem from "./CollectionItem";

export default function PokemonCollection({
  collection,
  getCollection,
  hideCollection,
}) {
  const temp =
    collection.data === undefined
      ? []
      : collection.data === "Empty collection"
      ? []
      : collection.data;
  return (
    <>
      <h3>My Pokemons Collection</h3>
      <div hidden={hideCollection} className="all-collection">
        {temp.map((itemCollection, i) => (
          <CollectionItem
            key={`collectionItem-${i}`}
            pokemonName={itemCollection}
          />
        ))}
      </div>
      <button className="get-collection-btn" onClick={getCollection}>
        Get collection
      </button>
    </>
  );
}
