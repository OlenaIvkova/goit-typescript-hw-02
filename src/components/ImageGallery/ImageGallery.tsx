import React from 'react';
import styles from './ImageGallery.module.css';

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

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {

  const handleImageClick = (image: Image): void => {
    onImageClick(image);
  };

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <div onClick={() => handleImageClick(image)}>
            <img src={image.urls.thumb} alt={image.alt_description} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;