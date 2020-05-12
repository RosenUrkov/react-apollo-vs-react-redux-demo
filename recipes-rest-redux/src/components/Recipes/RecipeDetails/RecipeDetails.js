import React from 'react';
import RecipeIngredient from '../RecipeIngredient/RecipeIngredient';

const RecipeDetails = props => {
  const { name, steps, ingredients } = props;

  return (
    <div>
      <div>Recipe</div>
      <div>{name}</div>
      <div>{steps}</div>

      {ingredients.map(ing => (
        <RecipeIngredient key={ing.id} {...ing} />
      ))}
    </div>
  );
};

export default RecipeDetails;
