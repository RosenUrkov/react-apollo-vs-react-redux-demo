import React from 'react';
import RecipeIngredient from '../RecipeIngredient/RecipeIngredient';
import classes from './RecipeDetails.module.css';

const RecipeDetails = props => {
  const { name, ingredients, isNew } = props;

  const recipeDetailsClasses = isNew
    ? [classes.RecipeDetails, classes.Scrollbar, classes.NewRecipe]
    : [classes.RecipeDetails, classes.Scrollbar];

  return (
    <div className={recipeDetailsClasses.join(' ')}>
      <div className={classes.Header}>
        <div className={classes.Name}>{name}</div>
        {isNew && <span className={classes.NewIndicator}>New</span>}
      </div>

      <br />

      <div className={classes.IngredientsWrapper}>
        {ingredients.map(ing => (
          <RecipeIngredient key={ing.id} {...ing} />
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
