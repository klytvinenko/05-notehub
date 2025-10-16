import css from "./SearchBox.module.css";

interface SearchProps {
  onSearch: (value: string) => void;
}

const SearchBox = ({ onSearch }: SearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
};

export default SearchBox;
