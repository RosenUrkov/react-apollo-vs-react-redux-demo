import React, { useEffect, Fragment } from 'react';
import Loader from '../../Common/Loader/Loader';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import classes from './RecipesList.module.css';

const RecipesList = props => {
  const { recipes, loading, error } = {};

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Recipes can't be loaded!</div>;
  }

  return (
    <div className={classes.RecipesList}>
      <h2 className={classes.Header}>Recipes</h2>

      <div className={classes.RecipesWrapper}>
        {recipes && recipes.map(rec => <RecipeDetails key={rec.id} {...rec} />)}
      </div>
    </div>
  );
};

export default RecipesList;
