import React, { useState } from 'react';
import { createRecipe } from '../../../Store/actions';
import { connect } from 'react-redux';

const CreateRecipe = props => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const [ingredients, setIngredients] = useState([]);

  const handleRecipeNameChange = ev => setRecipeName(ev.target.value);
  const handleIngredientNameChange = ev => setIngredientName(ev.target.value);
  const handleIngredientQuantityChange = ev =>
    setIngredientQuantity(ev.target.value);

  const handleIngredientAdded = () => {
    const ingredient = { name: ingredientName, quantity: ingredientQuantity };

    setIngredientName('');
    setIngredientQuantity('');
    setIngredients(prevIngs => [...prevIngs, ingredient]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const recipe = { name: recipeName, ingredients };
    props.createRecipe(recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Recipe name:</label>
      <input
        type="text"
        value={recipeName}
        onChange={handleRecipeNameChange}
        placeholder="Recipe name..."
      />

      <br />

      <label>Recipe ingredients:</label>
      {ingredients.map(ing => (
        <div key={ing.name + '-' + ing.quantity}>
          {ing.name + '-' + ing.quantity}
        </div>
      ))}

      <br />

      <input
        type="text"
        value={ingredientName}
        onChange={handleIngredientNameChange}
        placeholder="Enter a new ingredient"
      />

      <input
        type="text"
        value={ingredientQuantity}
        onChange={handleIngredientQuantityChange}
        placeholder="Enter the ingredient's quantity"
      />
      <button type="button" onClick={handleIngredientAdded}>
        Add ingredient!
      </button>

      <button type="submit">Submit!</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createRecipe: recipe => dispatch(createRecipe(recipe))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
