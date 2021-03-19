import React from "react";
import CollectionItem from "./CollectionItem";

export default function PokemonCollection({ collection, getCollection }) {
  console.log(collection.data);
  const temp =
    collection.data === undefined
      ? []
      : collection.data === "Empty collection"
      ? []
      : collection.data;
  console.log(temp);
  return (
    <>
      {temp.map((itemCollection, i) => (
        <CollectionItem
          key={`collectionItem-${i}`}
          pokemonName={itemCollection}
        />
      ))}
      <button className="get-collection-btn" onClick={getCollection}>
        Get collection
      </button>
    </>
  );
}
