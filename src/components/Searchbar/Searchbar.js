import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
  };

  return (
    <div className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
        />

        <button type="submit" className={s.button}>
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
