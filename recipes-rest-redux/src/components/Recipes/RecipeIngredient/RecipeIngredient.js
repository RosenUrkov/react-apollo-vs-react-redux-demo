import React from 'react';
import classes from './RecipeIngredient.module.css';

const RecipeIngredient = props => {
  const { quantity, name } = props;

  return (
    <div className={classes.RecipeIngredient}>{name + ' - ' + quantity}</div>
  );
};

export default RecipeIngredient;
