const { Router } = require("express");

const collection = Router();

//get all pokémons in your collection
collection.get("/", (req, res) => {
  res.send("collection route");
});

//add a new pokémon to your collection
collection.post("/catch", (req, res) => {
  res.send("collection route");
});

//remove a pokémon from your collection
collection.delete("/release/:id", (req, res) => {
  res.send("collection route");
});

module.exports = collection;
