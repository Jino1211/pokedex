const { Router } = require("express");
const { axios, POKEAPI_BASE_URL } = require("../utils/pokeAPI");

const type = Router();

//get type details by name
type.get("/:typeName", (req, res) => {
  const { typeName } = req.params;
  axios.get(`${POKEAPI_BASE_URL}/type/${typeName}`).then((pokemons) => {
    const pokemonsDataTypes = {
      id: pokemons.data.id,
      name: pokemons.data.name,
      pokemons: [],
    };
    pokemons.data.pokemon.forEach((pokemon) => {
      pokemonsDataTypes.pokemons.push(pokemon.pokemon);
    });
    res.send(pokemonsDataTypes);
  });
});

// Trying to get the img types from server. but cannot loading the src at time

// type.get("/:typeName", async (req, res) => {
//   const { typeName } = req.params;
//   const pokemons = await axios.get(`${POKEAPI_BASE_URL}/type/${typeName}`);
//   const pokemonsDataTypes = {
//     id: pokemons.data.id,
//     name: pokemons.data.name,
//     pokemons: [],
//   };
//   pokemons.data.pokemon.forEach(async (pokemonName) => {
//     // console.log(pokemonName.pokemon);
//     const result = await axios.get(
//       `${POKEAPI_BASE_URL}/pokemon/${pokemonName.pokemon.name}`
//     );
//     pokemonName.pokemon.src = result.data.sprites.front_default;
//     // console.log(pokemonName.pokemon);
//     pokemonsDataTypes.pokemons.push(pokemonName.pokemon);
//     console.log(pokemonsDataTypes);
//   });
//   res.send(pokemonsDataTypes);
// });
module.exports = type;
