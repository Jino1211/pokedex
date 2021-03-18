const { Router } = require("express");

const pokemon = Router();

//get pokémon details by name
pokemon.get("/:name", (req, res) => {
  res.send("Pokemon route");
});

module.exports = pokemon;
