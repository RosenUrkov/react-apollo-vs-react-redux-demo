import React from 'react';
import RecipeIngredient from '../RecipeIngredient/RecipeIngredient';
import classes from './RecipeDetails.module.css';

const RecipeDetails = props => {
  const { name, ingredients } = props;

  return (
    <div className={[classes.RecipeDetails, classes.Scrollbar].join(' ')}>
      <div className={classes.Name}>{name}</div>

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
