import React, { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";

export default function PokemonCollection({
  collection,
  getCollection,
  hideCollection,
  setHideCollection,
}) {
  const [btnText, setBtnText] = useState("Get collection");
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    collection.data === undefined
      ? setTemp([])
      : collection.data === "Empty collection"
      ? setTemp([])
      : setTemp(collection.data);
  }, [collection]);

  const handleCloseCollection = async () => {
    if (hideCollection === false) {
      setBtnText("Get collection");
      setHideCollection(true);
    } else {
      await getCollection();
      if (temp.length > 0 && hideCollection === true) {
        setHideCollection(false);
        setBtnText("Cancel");
      }
    }
  };

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
      <button className="get-collection-btn" onClick={handleCloseCollection}>
        {btnText}
      </button>
    </>
  );
}
