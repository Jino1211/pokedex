const { Router } = require("express");
const { axios, POKEAPI_BASE_URL } = require("../utils/pokeAPI");

const type = Router();

//get type details by name
type.get("/:typeName", async (req, res) => {
  const { typeName } = req.params;
  try {
    const { data } = await axios.get(`${POKEAPI_BASE_URL}/type/${typeName}`);

    const pokemonsDataTypes = {
      id: data.id,
      name: data.name,
      pokemons: [],
    };
    const promises = [];
    data.pokemon.forEach((pokemon) => {
      const { name } = pokemon.pokemon;
      promises.push(axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`));
    });
    const result = await Promise.all(promises);
    result.forEach(({ data }) => {
      pokemonsDataTypes.pokemons.push({
        front_default: data.sprites.front_default,
        name: data.name,
      });
    });

    res.send(pokemonsDataTypes);
  } catch (err) {
    res.status(500).send("We have a problem with our server");
  }
});

module.exports = type;
