import {
  REQUEST_FAIL,
  REQUEST_INIT,
  GET_RECIPES_SUCCESS,
  CREATE_RECIPE_SUCCESS
} from './actionTypes';

const initialState = {
  recipes: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...state, loading: true, error: null };

    case REQUEST_FAIL:
      return { ...state, loading: false, error: action.error };

    case GET_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: action.recipes };

    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.recipe]
      };

    default:
      return state;
  }
};

export default reducer;
