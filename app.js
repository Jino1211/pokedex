const express = require("express");
const cors = require("cors");
const api = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/api", api);

module.exports = app;
