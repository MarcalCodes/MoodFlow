const express = require("express");
var cors = require('cors')

const fs = require('node:fs');

const app = express();

app.use(cors())

const happyQuotes = JSON.parse(fs.readFileSync('data/quotes_happy.json', 'utf8'));
const sadQuotes = JSON.parse(fs.readFileSync('data/quotes_sad.json', 'utf8'));
const upliftingQuotes = JSON.parse(fs.readFileSync('data/quotes_uplifting.json', 'utf8'));

const allQuotes = happyQuotes.concat(sadQuotes).concat(upliftingQuotes)

app.get("/api/quotes", (request, response) => {
  response.json(allQuotes)
});

app.get("/api/quotes/happy", (request, response) => {
  response.json(happyQuotes)
});

app.get("/api/quotes/sad", (request, response) => {
  response.json(sadQuotes)
});

app.get("/api/quotes/uplifting", (request, response) => {
  response.json(upliftingQuotes)
});

const port = 3000;
app.listen(port, () => {
  console.log(`Quotes backend started on http://localhost:${port}`);
});
