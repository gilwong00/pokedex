const express = require('express');
const cors = require('cors');
const mogran = require('morgan');
const PORT = process.env.PORT || 5000;
const app = express();

const pokemonController = require('./controllers/pokemonController');

app.use(mogran('combined'));
app.use(cors());
app.use(express.json());

app.get('/api/pokemon', pokemonController.fetchPokemons);

app.listen(PORT, () => console.log(`running on port ${PORT}`));