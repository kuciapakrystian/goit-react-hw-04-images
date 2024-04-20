/* eslint-disable jsx-a11y/alt-text */
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageErrorView } from './ImageErrorView/ImageErrorView';
import { imgApi } from 'service/imgApi';

export const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!textQuery) return;

    async function componentDidUpdate() {
      
      setLoading(true);

      
      try {
        const response = await imgApi(textQuery, page);
        const { hits, totalHits } = response.data;
        setImages(
          prevImages => [...prevImages, ...hits],
          setTotalPage(totalHits)
        );
      } catch (error) {
        setError({ error: 'Something wrong. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
    componentDidUpdate();
  }, [page, textQuery]);

  
  const handleSubmit = searchValue => {
    if (textQuery === searchValue) {
      return;
    }
    setTextQuery(searchValue);
    setPage(1);
    setImages([]);
    setLoading(false);
    setShowModal(false);
    setError(null);
    setTotalPage(null);
  };

  
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  
  const onOpenModal = images => {
    setShowModal(true);
    setSelectedImage(images);
  };

  
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery images={images} openModal={onOpenModal} />

      
      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={selectedImage} />
        </Modal>
      )}

      
      <Loader isLoading={loading} />

     
      {totalPage / 12 > page && <Button loadMore={onLoadMore} />}

      
      {totalPage === 0 && <ImageErrorView />}

      
      {error && <ImageErrorView>{error}</ImageErrorView>}
    </>
  );
};