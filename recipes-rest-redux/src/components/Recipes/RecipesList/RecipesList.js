import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../../Store/actions';
import Loader from '../../Common/Loader/Loader';
import RecipeDetails from '../RecipeDetails/RecipeDetails';

const RecipesList = props => {
  const { getRecipes, recipes, loading, error } = props;

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

  return (
    <div>
      <h3>Recipes</h3>

      {recipes &&
        recipes.map(rec => {
          return (
            <Fragment key={rec.id}>
              <RecipeDetails {...rec} />
              <br />
            </Fragment>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
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
