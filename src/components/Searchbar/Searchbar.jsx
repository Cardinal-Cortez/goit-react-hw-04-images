import { useState } from "react"
import css from './Searchbar.module.css';
import PropTypes from "prop-types";

export const Searchbar = () => {
    const [search, setSearch] = useState("");

    const handleQueryChange = (e) => {
        setSearch(e.currentTarget.value.toLowerCase())
    };
    const handleSubmit = (e, { onSubmit }) => {
        e.preventDefault();
        if (search.trim() === '') return
        onSubmit(search);
    };
        
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="search"
                        onChange={handleQueryChange}
                        value={search}
                    />
                </form>
            </header>
        );
    }
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };