const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const data = require('./data.json');

const app = express();
app.use(cors(), bodyParser.json());

app.get('/recipes', (req, res) => {
  res.send(data);
});

app.post('/recipes', (req, res) => {
  const recipe = req.body;

  const createdRecipe = {
    ...recipe,
    id: uuid(),
    ingredients: recipe.ingredients.map(ing => ({ ...ing, id: uuid() }))
  };

  data.push(createdRecipe);
  res.send(createdRecipe);
});

app.listen(4001, () => `Express magic happens at port 4001`);
