import React, { useState, useMemo } from "react";
import "../styles/FilterPanel.css";

// List of all specialties
const SPECIALTIES = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian-Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
];

const FilterPanel = ({
  consultationType,
  setConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,
  sortBy,
  setSortBy,
}) => {
  const [searchSpecialty, setSearchSpecialty] = useState("");

  // Filter specialties based on search input
  const filteredSpecialties = useMemo(() => {
    return SPECIALTIES.filter((specialty) =>
      specialty.toLowerCase().includes(searchSpecialty.toLowerCase())
    );
  }, [searchSpecialty]);

  const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(
        selectedSpecialties.filter((s) => s !== specialty)
      );
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleClearAll = () => {
    setSelectedSpecialties([]);
    setConsultationType("all");
    setSortBy("");
    setSearchSpecialty("");
  };

  const handleClearSearch = () => {
    setSearchSpecialty("");
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Find experienced doctors</h2>
        <p>
          Book appointments with minimum wait-time & verified doctor details
        </p>
      </div>

      <div className="filter-panel">
        <div className="sort-section">
          <h3>Sort by</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="sort"
                value="price"
                checked={sortBy === "price"}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-fees"
              />
              <span>Price: Low-High</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="experience"
                checked={sortBy === "experience"}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="sort-experience"
              />
              <span>Experience - Most Experience first</span>
            </label>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-all" onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h4>Specialities</h4>
            <div className="search-specialties">
              <input
                type="text"
                placeholder="Search specialties"
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
              />
              {searchSpecialty && (
                <button className="clear-search" onClick={handleClearSearch}>
                  ✕
                </button>
              )}
              <span className="search-icon">🔍</span>
            </div>
            <div className="checkbox-group">
              {filteredSpecialties.map((specialty) => (
                <label key={specialty}>
                  <input
                    type="checkbox"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                    data-testid={`filter-specialty-${specialty}`}
                  />
                  <span>{specialty}</span>
                </label>
              ))}
              {filteredSpecialties.length === 0 && (
                <p className="no-results">No specialties found</p>
              )}
            </div>
          </div>

          <div className="filter-group">
            <h4>Mode of consultation</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="video"
                  checked={consultationType === "video"}
                  onChange={(e) => setConsultationType(e.target.value)}
                  data-testid="filter-video-consult"
                />
                <span>Video Consultation</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="clinic"
                  checked={consultationType === "clinic"}
                  onChange={(e) => setConsultationType(e.target.value)}
                  data-testid="filter-in-clinic"
                />
                <span>In-clinic Consultation</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="all"
                  checked={consultationType === "all"}
                  onChange={(e) => setConsultationType(e.target.value)}
                />
                <span>All</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
