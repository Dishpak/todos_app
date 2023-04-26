import React from 'react';

import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to={'/todos'}>Todos</NavLink>
      <NavLink to={'/completed'}>Completed Todos</NavLink>
    </nav>
  );
};

export default Navbar;
