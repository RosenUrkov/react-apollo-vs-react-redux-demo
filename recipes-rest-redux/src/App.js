import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './Store/reducer';
import Navigation from './components/Common/Navigation/Navigation';
import RecipeList from './components/Recipes/RecipesList/RecipesList';
import CreateRecipe from './components/Recipes/CreateRecipe/CreateRecipe';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route path="/" exact component={RecipeList} />
          <Route path="/create" exact component={CreateRecipe} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
