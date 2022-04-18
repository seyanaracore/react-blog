import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
   return (
      <nav className="nav-routes">
         <div className="nav-routes-container">
            <NavLink to="posts">Посты</NavLink>
            <NavLink to="about">О сайте</NavLink>
         </div>
      </nav>
   );
}
