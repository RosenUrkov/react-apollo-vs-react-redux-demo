import React, { useState } from 'react';
import RecipeIngredient from '../RecipeIngredient/RecipeIngredient';
import classes from './CreateRecipe.module.css';
import Loader from '../../Common/Loader/Loader';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_RECIPE } from '../../../ApiProvider/mutations';
import { GET_RECIPES, NEW_RECIPES } from '../../../ApiProvider/queries';

const CreateRecipe = props => {
  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE, {
    update: (cache, { data }) => {
      const query = cache.readQuery({ query: GET_RECIPES });
      const recipes = [...query.getRecipes, data.addRecipe];
      cache.writeQuery({ query: GET_RECIPES, data: { getRecipes: recipes } });

      const newRecipesQuery = cache.readQuery({ query: NEW_RECIPES });
      const updatedNewRecipes = [
        ...newRecipesQuery.newRecipes,
        data.addRecipe.id
      ];
      cache.writeQuery({
        query: NEW_RECIPES,
        data: { newRecipes: updatedNewRecipes }
      });
    },
    onCompleted: () => props.history.push('/')
  });

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
    createRecipe({ variables: { recipe } });
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

export default CreateRecipe;
