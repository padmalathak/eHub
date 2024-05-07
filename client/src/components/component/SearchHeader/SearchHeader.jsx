import "./SearchHeader.scss";
import { Link } from "react-router-dom";

const SearchHeader = ({ placeholder, searchQuery, onSearchChange }) => {
  return (
    <section className="search">
      <div className="search__input-container">
        <input
          className="search__input"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </section>
  );
};

export default SearchHeader;
