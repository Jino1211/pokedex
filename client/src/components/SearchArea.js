import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/searchArea.css";
import { React, useState } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
import PokemonsByType from "./PokemonsByType";
import PokemonCollection from "./PokemonCollection";
const URL = "http://localhost:3001/api";
const songPath =
  "https://vgmsite.com/soundtracks/pokemon-ten-years-of-pokemon/zmouwohk/1-Pokemon%20Theme%20%28Season%20Theme%29.mp3";
let allPokemonsOfType = {};

export default function SearchArea() {
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState({ data: "" });
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [pokemonTypeList, setPokemonTypeList] = useState("");
  const [hidden, setHidden] = useState(true);
  const [btnText, setBtnText] = useState("catch");
  const [hideCollection, setHideCollection] = useState(true);
  const [indexState, setIndexState] = useState(0);
  const [hiddenNextBtn, setHiddenNextBtn] = useState(true);

  //Function to get pokemon details
  const getPokemonDetails = async (e) => {
    const pokemonName = inputValue ? inputValue : e.target.innerText;
    setHideCollection(true);
    try {
      const pokemonState = await axios.get(`${URL}/pokemon/${pokemonName}`);
      pokemonState.data.caught = false;
      setBtnText("catch");
      const allCollection = await axios.get(`${URL}/collection`);
      if (allCollection.data !== "Empty collection") {
        const index = allCollection.data.findIndex(
          (poke) => poke.name === inputValue
        );
        if (index !== -1) {
          pokemonState.data.caught = true;
          setBtnText("release");
        }
      }
      setPokemon(pokemonState);
      setNotFoundMessage("");
      setSrcImg(pokemonState.data.sprites.front_default);
      setHidden(false);
      setPokemonTypeList("");
      setInputValue("");
      setIndexState(0);
      setHiddenNextBtn(true);
    } catch (e) {
      setPokemon({ data: "" });
      setSrcImg("");
      setHidden(true);
      setNotFoundMessage("Pokemon Not Found");
      setIndexState(0);
      setHiddenNextBtn(true);
    }
  };

  //Update state of input value
  const handleInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  //API request to get list containing the names of all the pokémons of this type
  const getTypeList = async (e) => {
    const typeName = e.target.innerText;
    try {
      const tempTypes = await axios.get(`${URL}/type/${typeName}`);

      // API get request for image source to type list
      tempTypes.data.pokemons.forEach((pokemonName) => {
        axios.get(`${URL}/pokemon/${pokemonName.name}`).then((result) => {
          const tempData = result;
          pokemonName.src = tempData.data.sprites.front_default;
        });
      });

      return tempTypes.data;
    } catch (e) {
      setPokemonTypeList("Server ERROR");
      console.log("catch getPokemonsType");
    }
  };

  // Get initial pokemons by types, when click on type name
  const getPokemonsType = async (e) => {
    allPokemonsOfType = await getTypeList(e);
    setHiddenNextBtn(false);
    setIndexState(0);
    nextPage();
  };

  // Limit the render to 20 pokemons of specific type on the DOM
  const nextPage = () => {
    const limitPokemonType = { pokemons: [] };
    if (indexState >= allPokemonsOfType.pokemons.length) return;
    setIndexState(indexState + 20);
    for (let i = indexState; i < indexState + 20; i++) {
      limitPokemonType.pokemons.push(allPokemonsOfType.pokemons[i]);
      if (i === allPokemonsOfType.pokemons.length - 1) {
        setPokemonTypeList(limitPokemonType);
        setIndexState(0);
        break;
      }
    }
    setPokemonTypeList(limitPokemonType);
  };

  //API post request to add pokemon to collection
  const [collection, setCollection] = useState("Empty collection");
  const addToCollection = async () => {
    if (btnText === "catch") {
      try {
        await axios.post(`${URL}/collection/catch`, pokemon);
        pokemon.data.caught = true;
        setBtnText("release");
      } catch (e) {
        console.log("catch addToCollection");
      }
    } else {
      try {
        await axios.delete(`${URL}/collection/release/${pokemon.data.id}`);
        pokemon.data.caught = false;
        setBtnText("catch");
      } catch (e) {
        console.log("catch delete addToCollection");
      }
    }
  };

  //Function to get all collection and present it on DOM
  const getCollection = () => {
    axios
      .get(`${URL}/collection`)
      .then((res) => {
        setCollection(res);
      })
      .catch((e) => {
        console.log("catch getCollection");
      });
    setHideCollection(false);
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
        btnText={btnText}
        nextPage={nextPage}
        hiddenNextBtn={hiddenNextBtn}
      />

      <PokemonCollection
        collection={collection}
        getCollection={getCollection}
        hideCollection={hideCollection}
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
      <AudioPlayer
        autoPlay={true}
        src={songPath}
        onPlay={(e) => console.log("onPlay")}
        loop={true}
        style={{
          width: "300px",
        }}
      />
    </div>
  );
}
