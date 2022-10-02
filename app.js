const express = require("express");
const bodyParser = require("body-parser");
const elasticsearch = require("elasticsearch");
const { application } = require("express");
const app = express();
const path = require("path");
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log("connected");
});

const esClient = elasticsearch.Client({
  host: "http://127.0.0.1:9200",
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./start.html"));
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "./search.html"));
});

//For some reason movies get added but still shows error in the browser window
app.post("/movies", (req, res) => {
  esClient
    .index({
      index: "movies",
      body: {
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating,
      },
    })
    .then((response) => {
      return res.json({ message: "Indexing successful" });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
});

app.get("/movies", (req, res) => {
  const searchText = req.query.key;
  esClient
    .search({
      index: "movies",
      body: {
        query: {
          match: { name: searchText.trim() },
        },
      },
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
});
