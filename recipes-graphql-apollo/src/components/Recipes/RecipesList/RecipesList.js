import React, { useEffect, Fragment } from "react";
import Loader from "../../Common/Loader/Loader";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import { useQuery } from "@apollo/react-hooks";
import classes from "./RecipesList.module.css";
import { GET_RECIPES } from "../../../ApiProvider/queries";

const RecipesList = (props) => {
  const { data, loading, error } = useQuery(GET_RECIPES);

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
        {data.getRecipes &&
          data.getRecipes.map((rec) => <RecipeDetails key={rec.id} {...rec} />)}
      </div>
    </div>
  );
};

export default RecipesList;
