import { useState, useEffect } from "react";
import css from './Modal.module.css';
import PropTypes from "prop-types";

export const Modal = ({ picture, onClose, handleImageClick }) => {

  const [isOpen, setIsopen] = useState(false);

  useEffect(() => { 
    const onCloseModal = (event) => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onClose();
    }
  };  
    document.addEventListener("keyup", onCloseModal);
    return () => {
      document.removeEventListener("keyup", onCloseModal);
    };
  }, [onClose]);

  // const openModal = () => {
  //   setIsopen(true);
  // };

  const closeModal = () => {
    setIsopen(false);
    onClose();
    console.log(picture)
  };

  return (
    <div className={`${css.Overlay} ${isOpen ? "open" : ""}`}
      onClick={closeModal}>
      <div className={css.Modal}>
        <img src={picture.largeImageURL} alt={picture.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  picture: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired
};
