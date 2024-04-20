import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryList>
      {images.map(img => (
        <ImageGalleryItem key={img.id} item={img} openModal={openModal} />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};