import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/searchArea.css";
import { React, useState, useRef } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
import PokemonsByType from "./PokemonsByType";
import PokemonCollection from "./PokemonCollection";
import teamRocket from "../photos/team-rocket.png";
import openPokeBall from "../photos/open-pokeball.png";
import closePokeBall from "../photos/close-pokeball.png";
import pikachuSad from "../photos/pikachu-sad.png";
import searchPikachu from "../photos/search-pikachu.png";
const URL = "/api";
const songPath =
  "https://vgmsite.com/soundtracks/pokemon-ten-years-of-pokemon/zmouwohk/1-Pokemon%20Theme%20%28Season%20Theme%29.mp3";
let allPokemonsOfType = {};

export default function SearchArea() {
  const inputValueRef = useRef();
  const [pokemon, setPokemon] = useState({ data: "" });
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [pokemonTypeList, setPokemonTypeList] = useState("");
  const [hidden, setHidden] = useState(true);
  const [btnText, setBtnText] = useState(openPokeBall);
  const [hideCollection, setHideCollection] = useState(true);
  const [indexState, setIndexState] = useState(0);
  const [hiddenNextBtn, setHiddenNextBtn] = useState(true);
  const [classNameSpinner, setClassNameSpinner] = useState("spinner-div");
  const [blurWhenLoading, setBlurWhenLoading] = useState("main");

  //Function to get pokemon details
  const getPokemonDetails = async (e) => {
    const pokemonName = inputValueRef.current.value
      ? inputValueRef.current.value.toLowerCase()
      : e.target.innerText;

    if (pokemonName === "") return;

    setHideCollection(true);
    try {
      setClassNameSpinner("loader");
      setBlurWhenLoading("blur");
      const pokemonState = await axios.get(`${URL}/pokemon/${pokemonName}`);
      pokemonState.data.caught = false;
      setBtnText(openPokeBall);
      const allCollection = await axios.get(`${URL}/collection`);

      if (allCollection.data !== "Empty collection") {
        const index = allCollection.data.findIndex(
          (poke) =>
            poke.name === inputValueRef.current.value ||
            poke.id === Number(inputValueRef.current.value)
        );
        if (index !== -1) {
          pokemonState.data.caught = true;
          setBtnText(closePokeBall);
        }
      }
      inputValueRef.current.value = "";
      setPokemon(pokemonState);
      setNotFoundMessage("");
      setSrcImg(pokemonState.data.sprites.front_default);
      setHidden(false);
      setPokemonTypeList("");
      setIndexState(0);
      setHiddenNextBtn(true);
      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");
    } catch (e) {
      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");
      setPokemon({ data: "" });
      setSrcImg("");
      setHidden(true);
      setNotFoundMessage(pikachuSad);
      setIndexState(0);
      setHiddenNextBtn(true);
    }
  };

  //API request to get list containing the names of all the pokémons of this type
  const getTypeList = async (e) => {
    const typeName = e.target.innerText;
    try {
      setClassNameSpinner("loader");
      setBlurWhenLoading("blur");

      const tempTypes = await axios.get(`${URL}/type/${typeName}`);

      // API get request for image source to type list
      tempTypes.data.pokemons.forEach((pokemonName) => {
        pokemonName.src = pokemonName.front_default;
      });

      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");

      return tempTypes.data;
    } catch (e) {
      setClassNameSpinner("spinner-div");
      setBlurWhenLoading("main");

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
    setIndexState(indexState + 21);
    for (let i = indexState; i < indexState + 21; i++) {
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
    if (btnText === openPokeBall) {
      try {
        setClassNameSpinner("loader");
        setBlurWhenLoading("blur");

        await axios.post(`${URL}/collection/catch`, pokemon);
        pokemon.data.caught = true;
        setBtnText(closePokeBall);
        setCollection(await axios.get(`${URL}/collection`));

        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
      } catch (e) {
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");

        console.log("catch addToCollection");
      }
    } else {
      try {
        setClassNameSpinner("loader");
        setBlurWhenLoading("blur");

        await axios.delete(`${URL}/collection/release/${pokemon.data.id}`);
        pokemon.data.caught = false;
        setBtnText(openPokeBall);
        setCollection(await axios.get(`${URL}/collection`));
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
      } catch (e) {
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");

        console.log("catch delete addToCollection");
      }
    }
  };

  //Function to get all collection and present it on DOM
  const getCollection = () => {
    setClassNameSpinner("loader");
    setBlurWhenLoading("blur");

    axios
      .get(`${URL}/collection`)
      .then((res) => {
        setCollection(res);
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");
      })
      .catch((e) => {
        setClassNameSpinner("spinner-div");
        setBlurWhenLoading("main");

        console.log("catch getCollection");
      });
    setHideCollection(false);
  };

  const handleKeyUp = (e) => {
    if (inputValueRef.current.value === "") return;
    if (e.key === "Enter") {
      getPokemonDetails();
    }
  };

  return (
    <div className="search-area">
      <AudioPlayer
        autoPlay={true}
        src={songPath}
        onPlay={(e) => console.log("onPlay")}
        loop={true}
        style={{
          width: "300px",
          position: "sticky",
          top: 0,
          backgroundColor: "rgb(132, 196, 238)",
          boxShadow: "none",
        }}
      />
      <div className="input-btn">
        <input
          className="search-input"
          placeholder="Search Pokémon"
          ref={inputValueRef}
          onKeyUp={handleKeyUp}
        ></input>
        <img
          className="search-button"
          src={searchPikachu}
          onClick={getPokemonDetails}
        ></img>
      </div>
      <div className={classNameSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={blurWhenLoading}>
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
        <img className="pikachu" src={notFoundMessage}></img>

        <div className="collection-div">
          <PokemonCollection
            collection={collection}
            getCollection={getCollection}
            hideCollection={hideCollection}
            setHideCollection={setHideCollection}
          />
        </div>
      </div>
      <button className="next-btn" hidden={hiddenNextBtn} onClick={nextPage}>
        Next
      </button>
      {/* Check if the pokemon type list is not empty and loop with map to render on DOM  */}
      <ul className="ul-pokemon-types">
        {pokemonTypeList.pokemons && notFoundMessage === ""
          ? pokemonTypeList.pokemons.map((pokemon, i) => (
              <PokemonsByType
                key={`pokemonListByType-${i}`}
                pokemonListByType={pokemon}
                getPokemonDetails={getPokemonDetails}
              />
            ))
          : ""}
      </ul>
    </div>
  );
}
