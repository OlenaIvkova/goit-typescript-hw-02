import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  likes: number;
}

interface ImageModalProps {
  data: Image;
  onClose: () => void;
}

ReactModal.setAppElement('#root');

const ImageModal = ({ data, onClose }: ImageModalProps) => (
  <ReactModal isOpen={true} onRequestClose={onClose} className={styles.modal}>
    <div className={styles.content}>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>
      <img src={data.urls.regular} alt={data.alt_description || 'No description'} />
      <p>{data.alt_description || 'No description'}</p>
      <p>Author: {data.user.name}</p>
      <p>Likes: {data.likes}</p>
    </div>
  </ReactModal>
);

export default ImageModal;