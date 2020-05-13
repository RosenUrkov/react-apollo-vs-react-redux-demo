import {
  REQUEST_FAIL,
  REQUEST_INIT,
  GET_RECIPES_SUCCESS,
  CREATE_RECIPE_SUCCESS
} from './actionTypes';

export const requestInit = () => {
  return {
    type: REQUEST_INIT
  };
};

export const requestFail = error => {
  return {
    type: REQUEST_FAIL,
    error
  };
};

export const getRecipesSuccess = recipes => {
  return {
    type: GET_RECIPES_SUCCESS,
    recipes
  };
};

export const createRecipeSuccess = recipe => {
  return {
    type: CREATE_RECIPE_SUCCESS,
    recipe
  };
};

export const getRecipes = () => {
  return dispatch => {
    dispatch(requestInit());

    fetch('http://localhost:4001/recipes')
      .then(res => res.json())
      .then(data => dispatch(getRecipesSuccess(data)))
      .catch(err => dispatch(requestFail(err.message)));
  };
};

export const createRecipe = (recipe, onSuccessCb) => {
  return dispatch => {
    dispatch(requestInit());

    fetch('http://localhost:4001/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(createRecipeSuccess(data));
        onSuccessCb();
      })
      .catch(err => dispatch(requestFail(err)));
  };
};
