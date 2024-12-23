import styles from './ImageCard.module.css';

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
}

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => (
  <div className={styles.card} onClick={() => onClick(image)}>
    <img src={image.urls.small} alt={image.alt_description || 'Image'} />
  </div>
);

export default ImageCard;