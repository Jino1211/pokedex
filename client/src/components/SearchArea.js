import { React, useState } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
const URL = "http://localhost:3001/api/pokemon/";

export default function SearchArea() {
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState({ data: "" });
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [srcImg, setSrcImg] = useState("");

  const getPokemonDetails = async () => {
    const pokemonName = inputValue;
    try {
      const pokemonState = await axios.get(`${URL}/${pokemonName}`);
      setPokemon(pokemonState);
      setNotFoundMessage("");
      setSrcImg(pokemonState.data.sprites.front_default);
    } catch (e) {
      setPokemon({ data: "" });
      setNotFoundMessage("Pokemon Not Found");
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  return (
    <div className="search-area">
      <input
        className="search-input"
        placeholder="Search Pokémon"
        onChange={handleInput}
      ></input>
      <button className="search-button" onClick={getPokemonDetails}>
        Search
      </button>
      <div>{notFoundMessage}</div>
      <PokemonDetails setSrcImg={setSrcImg} srcImg={srcImg} pokemon={pokemon} />
    </div>
  );
}
