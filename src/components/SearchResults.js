import React from "react";
import "../styles/SearchResults.css";

const SearchResults = ({
  results,
  searchQuery,
  onSelect,
  highlightedIndex,
  onHover,
}) => {
  if (!searchQuery) return null;

  // Function to highlight the matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="search-results">
      {results.map((doctor, index) => (
        <div
          key={doctor.id}
          className={`search-result-item ${
            highlightedIndex === index ? "highlighted" : ""
          }`}
          onClick={() => onSelect(doctor)}
          onMouseEnter={() => onHover(index)}
          role="option"
          aria-selected={highlightedIndex === index}
        >
          <div className="doctor-result">
            <img
              src={doctor.photo || "https://via.placeholder.com/40"}
              alt={doctor.name}
              className="doctor-thumbnail"
            />
            <div className="doctor-details">
              <div className="doctor-name">
                {highlightMatch(doctor.name, searchQuery)}
              </div>
              <div className="doctor-specialty">
                {doctor.specialities?.[0]?.name || "DENTIST"}
              </div>
            </div>
            <div className="arrow-icon">›</div>
          </div>
        </div>
      ))}
      {results.length === 0 && (
        <div className="no-results-found">No doctors found</div>
      )}
    </div>
  );
};

export default SearchResults;
