import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';

type Image = {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
};

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'QpRUaujVuECc3-OzieDpPpjpVf0UmvE9uvJXhM0qFpc';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]); 
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        });
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(searchQuery);
    setPage(1);
  };

  const openModal = (image: Image): void => {
    if (modalData) {
      console.log('Modal is already open.');
      return;
    }
    console.log('Opening modal for image:', image);
    setModalData(image);
  };

  const closeModal = (): void => {
    console.log('Closing modal.');
    setModalData(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />}
      {modalData && <ImageModal data={modalData} onClose={closeModal} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;