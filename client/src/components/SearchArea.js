import "../styles/searchArea.css";
import { React, useState } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
import PokemonsByType from "./PokemonsByType";
import PokemonCollection from "./PokemonCollection";
const URL = "http://localhost:3001/api";

export default function SearchArea() {
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState({ data: "" });
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [pokemonTypeList, setPokemonTypeList] = useState("");
  const [hidden, setHidden] = useState(true);

  //Function to get pokemon details
  const getPokemonDetails = async (e) => {
    const pokemonName = inputValue ? inputValue : e.target.innerText;

    try {
      const pokemonState = await axios.get(`${URL}/pokemon/${pokemonName}`);
      setPokemon(pokemonState);
      setNotFoundMessage("");
      setSrcImg(pokemonState.data.sprites.front_default);
      setHidden(false);
      setPokemonTypeList("");
      setInputValue("");
    } catch (e) {
      setPokemon({ data: "" });
      setSrcImg("");
      setHidden(true);
      setNotFoundMessage("Pokemon Not Found");
    }
  };

  //Update state of input value
  const handleInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  //API request to get list containing the names of all the pokémons of this type
  const getPokemonsType = async (e) => {
    const typeName = e.target.innerText;
    try {
      const tempTypes = await axios.get(`${URL}/type/${typeName}`);

      //API get request for image source to type list
      tempTypes.data.pokemons.forEach((pokemonName) => {
        axios.get(`${URL}/pokemon/${pokemonName.name}`).then((result) => {
          const tempData = result;
          pokemonName.src = tempData.data.sprites.front_default;
        });
      });
      setPokemonTypeList(tempTypes.data);
    } catch (e) {
      setPokemonTypeList("Server ERROR");
      console.log("catch");
    }
  };

  //API post request to add pokemon to collection
  const [caught, setCaught] = useState([]);
  const addToCollection = async () => {
    await axios.post(`${URL}/collection/catch`, pokemon);
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
      <PokemonDetails
        setSrcImg={setSrcImg}
        srcImg={srcImg}
        pokemon={pokemon}
        getPokemonsType={getPokemonsType}
        hidden={hidden}
        addToCollection={addToCollection}
      />

      {/* Check if the pokemon type list is not empty and loop with map to render on DOM  */}

      <ul className="ul-pokemon-types">
        {pokemonTypeList.pokemons
          ? pokemonTypeList.pokemons.map((pokemon, i) => (
              <PokemonsByType
                key={`pokemonListByType-${i}`}
                pokemonListByType={pokemon}
                getPokemonDetails={getPokemonDetails}
              />
            ))
          : ""}
      </ul>
      <PokemonCollection caught={caught} />
    </div>
  );
}
