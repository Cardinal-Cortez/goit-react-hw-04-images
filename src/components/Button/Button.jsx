import PropTypes from "prop-types";
import css from './Button.module.css';

export const ButtonLoadMore = ({onLoadMore}) => {
  
  const handleLoadMore = () => {
    onLoadMore();
  };

    return (
      <button onClick={handleLoadMore} className={css.Button}>
        Load more
      </button>
    );
  }

ButtonLoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired
};
