const { Router } = require("express");
const { axios, POKEAPI_BASE_URL } = require("../utils/pokeAPI");

const collection = Router();
const pokemonsCollection = [];

//get all pokémons in your collection
collection.get("/", (req, res) => {
  if (pokemonsCollection.length === 0) return res.send("Empty collection");
  res.send(pokemonsCollection);
});

//add a new pokémon to your collection
collection.post("/catch", (req, res) => {
  let bool = false;
  if (pokemonsCollection.length > 0) {
    pokemonsCollection.forEach((pokemon) => {
      if (pokemon.name === req.body.data.name) {
        bool = true;
      }
    });
  }
  if (bool) {
    return res.status(204).send();
  } else {
    pokemonsCollection.push(req.body.data);
    return res.status(201).send();
  }
});

//remove a pokémon from your collection
collection.delete("/release/:id", (req, res) => {
  const { id } = req.params;
  const index = pokemonsCollection.findIndex(
    (pokemon) => pokemon.id === Number(id)
  );
  pokemonsCollection.splice(index, 1);
  res.send(pokemonsCollection);
});

module.exports = collection;
