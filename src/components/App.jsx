import { useState } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import css from './App.module.css'

export const App = () => {

  const [search, setSearch] = useState('');

  const handleFormSubmit = (search) => {
    setSearch({ search });
  };

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery search={search} />
      </div>
    );
  }

