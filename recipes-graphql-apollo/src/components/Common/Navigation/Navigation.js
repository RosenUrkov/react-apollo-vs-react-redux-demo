import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = props => {
  return (
    <div className={classes.Navigation}>
      <NavLink
        to="/"
        exact={true}
        className={classes.Link}
        activeClassName={classes.Active}
      >
        Recipes
      </NavLink>

      <NavLink
        to="/create"
        className={classes.Link}
        activeClassName={classes.Active}
      >
        Create Recipe
      </NavLink>
    </div>
  );
};

export default Navigation;
