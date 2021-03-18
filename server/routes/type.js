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

module.exports = type;
