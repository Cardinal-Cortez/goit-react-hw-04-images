import PropTypes from "prop-types";
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem= ()=> {

  const heandleClick = ({picture, onImageClick}) => {
        onImageClick(picture);
    };

        return (
            
            <li className={css.ImageGalleryItem}>
                <img className={css.ImageGalleryItemImage}
                    src={picture.webformatURL}
                    alt={picture.tags}
                    onClick={heandleClick}
                />
            </li>
        );
    }
  ImageGalleryItem.propTypes = {
    picture: PropTypes.shape({
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    }).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };