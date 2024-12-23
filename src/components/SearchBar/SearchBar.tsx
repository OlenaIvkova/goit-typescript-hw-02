import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;