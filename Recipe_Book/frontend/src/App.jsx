import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  const fetchRecipes = async () => {
    try {
      const url = `http://localhost:3001/recipes${category !== 'All' ? `/${category}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const addRecipe = async () => {
    try {
      const response = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          ingredients,
          category: newCategory
        })
      });
      if (response.ok) {
        fetchRecipes();
        setName('');
        setIngredients('');
        setNewCategory('');
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="container">
      <h2>Recipe Book</h2>

      {/* Recipe Form */}
      <input
        placeholder="Recipe Name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <input
        placeholder="Ingredients"
        onChange={e => setIngredients(e.target.value)}
        value={ingredients}
      />
      <input
        placeholder="Category"
        onChange={e => setNewCategory(e.target.value)}
        value={newCategory}
      />
      <button onClick={addRecipe}>Add Recipe</button>

      {/* Category Filter */}
      <select onChange={e => setCategory(e.target.value)} value={category}>
        <option>All</option>
        <option>Dessert</option>
        <option>Main Course</option>
      </select>

      {/* Recipe List */}
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Category: {recipe.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
