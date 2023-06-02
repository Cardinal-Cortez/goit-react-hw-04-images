import { ImageGalleryItem } from "components/ImageGalleryItem";
import { Loader } from "components/Loader";
import { Modal } from "components/Modal";
import { ButtonLoadMore } from "components/Button";
import PropTypes from "prop-types";
import css from './ImageGallery.module.css';
import { useState, useEffect} from "react";

export const ImageGallery = (data) => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(data.totalHits);


  useEffect(() => {
    setPictures([]);
    setPage(1);
    setStatus('pending');
    fetchPictures();
  }, [ page, status])


  const fetchPictures = (search) => {

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
          setStatus("resolved")
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
        })
        .catch((error) => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const handleImageClick = (pictures) => {
    setSelectedPicture(pictures);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
  };

  const handleLoadMore = () => {

    if (pictures.length < totalImages) {
      setPage((prev) => {
        return prev + 1
      })
      setStatus('pending');
      setLoading(true);
    }
  };


  if (status === 'idle') {
    return (
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Please, read text
      </h1>
    );
  }
  if (status === 'pending' && pictures.length === 0) {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <h2>{error.message}</h2>;
  }
  if (status === 'resolved') {
    return (
      <>
        {loading && <Loader />}
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
            isOpen={true}
            onClose={handleCloseModal}
          />
        )}
        {pictures.length < totalImages && (
          <ButtonLoadMore onLoadMore={handleLoadMore} />
        )}
      </>
    );
  }
};
ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
  };
