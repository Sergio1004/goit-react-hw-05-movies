import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={s.navigation}>
      <NavLink to="/" className={s.link}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
