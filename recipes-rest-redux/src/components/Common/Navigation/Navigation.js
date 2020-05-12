import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  return (
    <div>
      <NavLink to="/">Recipes</NavLink>
      <br />
      <NavLink to="/create">Create Recipe</NavLink>
    </div>
  );
};

export default Navigation;
