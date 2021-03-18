const { Router } = require("express");

const type = Router();

//get type details by name
type.get("/:name", (req, res) => {
  res.send("type route");
});

module.exports = type;
