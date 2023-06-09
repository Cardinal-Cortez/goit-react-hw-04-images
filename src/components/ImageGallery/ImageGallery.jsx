import { ImageGalleryItem } from "components/ImageGalleryItem";
import { Loader } from "components/Loader";
import { Modal } from "components/Modal";
import { ButtonLoadMore } from "components/Button";
import PropTypes from "prop-types";
import css from './ImageGallery.module.css';
import { useState, useEffect} from "react";

export const ImageGallery = ({ search }) => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (search) {
      setPictures([]);
      setPage(1);
    }
  }, [search]);
  
  useEffect(() => {
  
    if (search) {
      const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=35198425-4c40430781db1dbcd425bce9c&image_type=photo&orientation=horizontal&per_page=12`;
      setLoading(true);
      
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Not found image ${search}`);
        })
        .then((data) => {
          setPictures((prev) => {
            return [...prev, ...data.hits]
          });
          setTotalImages(data.totalHits);
          setStatus("resolved");
          setLoading(false)
        })
        .catch((error) => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page, search]);

  useEffect(() => {
    if (page > 1) {
      const galleryEl = document.querySelector(`.${css.imageGallery}`);
      if (galleryEl) {
        const { height: cardHeight } = galleryEl.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth'
        });
      }
    };
  }, [page, pictures]);

  const handleImageClick = (picture) => {
    setSelectedPicture(picture);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
  };

  const handleLoadMore = () => {
    if (pictures.length < totalImages) {
      setPage((prev) => prev + 1);
      setStatus('pending');
      setLoading(true);
    }
  };

  return (
    <>
      {loading && pictures.length === 0 && <Loader />}
      {status === 'rejected' && <h2>{error.message}</h2>}
      {status === 'resolved' && (
        <>
          <ul className={css.imageGallery}>
            {pictures.map((picture) => (
              <ImageGalleryItem
                key={picture.id}
                picture={picture}
                onImageClick={handleImageClick}
              />
            ))}
          </ul>

          {selectedPicture && (
            <Modal
              picture={selectedPicture}
              onClose={handleCloseModal}
            />
          )}
          {pictures.length < totalImages && (
            <ButtonLoadMore onLoadMore={handleLoadMore} />
          )}
        </>
      )}
    </>
  );
};
ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
  };
