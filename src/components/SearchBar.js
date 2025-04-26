import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm, doctors }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm) {
      const matches = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3) // Get top 3 matches
        .map((doctor) => doctor.name);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, doctors]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search Doctors, Specialists, Clinics"
        className="search-input"
        data-testid="autocomplete-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              data-testid="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
