import React from 'react';

const RecipeIngredient = props => {
  const { quantity, name } = props;

  return (
    <div>
      <div>Ingredient</div>
      <div>{name}</div>
      <div>{quantity}</div>
    </div>
  );
};

export default RecipeIngredient;
