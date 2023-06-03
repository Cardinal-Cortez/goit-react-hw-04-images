import { useState } from "react";
import { Searchbar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import css from './App.module.css'

export const App = () => {

  const [search, setSearch] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const handleFormSubmit = (search, totalHits) => {
    setSearch(search);
    setTotalHits(totalHits);
  };

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery search={search} totalHits={totalHits} />
      </div>
    );
  }

