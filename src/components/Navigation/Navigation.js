import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <header>
      <div className={s.container}>
        <nav className={s.navigation}>
          <NavLink
            to="/"
            className={s.navigation__link}
            style={({ isActive }) => ({
              color: isActive ? 'tomato' : 'white',
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className={s.navigation__link}
            style={({ isActive }) => ({
              color: isActive ? 'tomato' : 'white',
            })}
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
