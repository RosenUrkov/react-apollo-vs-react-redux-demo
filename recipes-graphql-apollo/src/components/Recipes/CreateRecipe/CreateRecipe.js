import React, { useState } from 'react';
import { createRecipe } from '../../../Store/actions';
import { connect } from 'react-redux';
import RecipeIngredient from '../RecipeIngredient/RecipeIngredient';
import classes from './CreateRecipe.module.css';
import Loader from '../../Common/Loader/Loader';

const CreateRecipe = props => {
  const { createRecipe, loading, error } = props;

  const [recipeName, setRecipeName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const [ingredients, setIngredients] = useState([]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>We could not create the recipe!</div>;
  }

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
    createRecipe(recipe, () => props.history.push('/'));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.CreateRecipe}>
        <h2 className={classes.Header}>Create Recipe</h2>

        <label className={classes.Label}>Recipe name:</label>
        <input
          type="text"
          value={recipeName}
          onChange={handleRecipeNameChange}
          className={classes.Input}
          placeholder="Recipe name..."
        />

        <div className={classes.IngredientsArea}>
          <label className={classes.Label}>Recipe ingredients:</label>
          <div className={classes.AddedIngredientsWrapper}>
            {ingredients.length ? (
              ingredients.map(ing => (
                <RecipeIngredient
                  key={ing.name + '-' + ing.quantity}
                  {...ing}
                />
              ))
            ) : (
              <div style={{ fontStyle: 'italic' }}>No ingredients added</div>
            )}
          </div>

          <div className={classes.AddIngredientForm}>
            <div className={classes.IngredientView}>
              <input
                type="text"
                value={ingredientName}
                onChange={handleIngredientNameChange}
                className={classes.Input}
                placeholder="Ingredient name"
              />
              <span className={classes.IngredientsSeparator}>-</span>
              <input
                type="text"
                value={ingredientQuantity}
                onChange={handleIngredientQuantityChange}
                className={classes.Input}
                placeholder="Ingredient quantity"
              />
            </div>

            <button
              type="button"
              onClick={handleIngredientAdded}
              className={classes.AddIngredientButton}
            >
              Add ingredient!
            </button>
          </div>
        </div>

        <button type="submit" className={classes.Submit}>
          Submit!
        </button>
      </form>
    </>
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
    createRecipe: (recipe, onSuccessCb) =>
      dispatch(createRecipe(recipe, onSuccessCb))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
