import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => (
  <button className={styles.loadMore} onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreBtn;