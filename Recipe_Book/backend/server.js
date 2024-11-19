// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeDB', {
 
});

// Define the Recipe schema and model in the same file
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: { type: String, required: true },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

app.use(cors());
app.use(express.json());

// Route to add a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const { name, ingredients, category } = req.body;
    const recipe = new Recipe({ name, ingredients, category });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add recipe' });
  }
});

// Route to get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch recipes' });
  }
});

// Route to get recipes by category
app.get('/recipes/:category', async (req, res) => {
  try {
    const recipes = await Recipe.find({ category: req.params.category });
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch recipes by category' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
