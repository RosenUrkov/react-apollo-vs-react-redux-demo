import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../../Store/actions';
import Loader from '../../Common/Loader/Loader';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import classes from './RecipesList.module.css';

const RecipesList = props => {
  const { getRecipes, recipes, newRecipes, loading, error } = props;

  useEffect(() => {
    if (!recipes) {
      getRecipes();
    }
  }, [recipes]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Recipes can't be loaded!</div>;
  }

  const isNewRecipe = id => newRecipes.includes(id);

  return (
    <div className={classes.RecipesList}>
      <h2 className={classes.Header}>Recipes</h2>

      <div className={classes.RecipesWrapper}>
        {recipes &&
          recipes.map(rec => (
            <RecipeDetails key={rec.id} isNew={isNewRecipe(rec.id)} {...rec} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    newRecipes: state.newRecipes,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipes: () => dispatch(getRecipes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
