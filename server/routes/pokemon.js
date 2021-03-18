const { Router } = require("express");
const { axios, POKEAPI_BASE_URL } = require("../utils/pokeAPI");
const pokemon = Router();

//get pokémon details by name
pokemon.get("/:name", (req, res) => {
  const { name } = req.params;
  axios
    .get(`${POKEAPI_BASE_URL}/pokemon/${name}`)
    .then((pokemon) => {
      const pokemonData = {
        name: pokemon.data.name,
        id: pokemon.data.id,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        types: pokemon.data.types,
        sprites: {
          back_default: pokemon.data.sprites.back_default,
          front_default: pokemon.data.sprites.front_default,
        },
      };
      res.send(pokemonData);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = pokemon;
