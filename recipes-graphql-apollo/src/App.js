import React from "react";
import Navigation from "./components/Common/Navigation/Navigation";
import RecipeList from "./components/Recipes/RecipesList/RecipesList";
import CreateRecipe from "./components/Recipes/CreateRecipe/CreateRecipe";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ApiProvider from "./ApiProvider/ApiProvider";

const App = () => {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route path="/create" exact component={CreateRecipe} />
          <Route path="/" exact component={RecipeList} />
        </Switch>
      </BrowserRouter>
    </ApiProvider>
  );
};

export default App;
