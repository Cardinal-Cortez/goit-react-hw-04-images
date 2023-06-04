import { useState, useEffect } from "react";
import css from './Modal.module.css';
import PropTypes from "prop-types";

export const Modal = ({ picture, onClose }) => {

  const [isOpen, setIsopen] = useState(false);

  useEffect(() => { 
    const onCloseModal = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };  
    document.addEventListener("keyup", onCloseModal);
    return () => {
      document.removeEventListener("keyup", onCloseModal);
    };
  }, [onClose]);

  const closeModal = () => {
    setIsopen(false);
    onClose();
  };
  const handleOvarlayClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeModal()
  };

  return (
    <div className={`${css.Overlay} ${isOpen ? "open" : ""}`}
      onClick={handleOvarlayClick}>
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
