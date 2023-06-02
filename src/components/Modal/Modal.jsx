import { useState, useEffect } from "react";
import css from './Modal.module.css';
import PropTypes from "prop-types";

export const Modal = ({ picture }) => {

  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    const handleKeyUp = () => 
    document.addEventListener("keyup", onCloseModal);
    return () => {
      document.removeEventListener("keyup", onCloseModal);
    };
  }, []);

  const openModal = () => {
    setIsopen(true);
  };

  const closeModal = () => {
    setIsopen(false);
  };

  const onCloseModal = (event, { onClose }) => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${css.Overlay} ${isOpen ? "open" : ""}`}
      onClick={onCloseModal}>
      <div className={css.Modal}>
        <img src={picture.largeImageURL} alt={picture.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  picture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
