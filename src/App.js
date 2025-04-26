import React, { useState, useEffect, useCallback } from "react";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import SearchResults from "./components/SearchResults";
import "./styles/App.css";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [consultationType, setConsultationType] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
        );
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  // Filter doctors for search results
  const searchResults = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter doctors based on search query, specialties, and consultation type
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialties.length === 0 ||
      (doctor.specialities &&
        doctor.specialities.some((s) => selectedSpecialties.includes(s.name)));
    const matchesConsultationType =
      consultationType === "all" ||
      (consultationType === "video" && doctor.video_consult) ||
      (consultationType === "clinic" && doctor.in_clinic);

    return matchesSearch && matchesSpecialty && matchesConsultationType;
  });

  // Sort doctors based on selected criteria
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "price") {
      const feeA = parseInt(a.fees.replace(/[^0-9]/g, ""));
      const feeB = parseInt(b.fees.replace(/[^0-9]/g, ""));
      return feeA - feeB;
    } else if (sortBy === "experience") {
      const expA = parseInt(a.experience.split(" ")[0]);
      const expB = parseInt(b.experience.split(" ")[0]);
      return expB - expA;
    }
    return 0;
  });

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for click events
    setTimeout(() => {
      setShowSearchResults(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const handleDoctorSelect = useCallback((doctor) => {
    setSearchQuery(doctor.name);
    setShowSearchResults(false);
    setHighlightedIndex(-1);
  }, []);

  const handleKeyDown = (e) => {
    if (!showSearchResults) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : -1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && searchResults[highlightedIndex]) {
          handleDoctorSelect(searchResults[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowSearchResults(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleHover = (index) => {
    setHighlightedIndex(index);
  };

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onKeyDown={handleKeyDown}
            className="doctor-search"
            role="combobox"
            aria-expanded={showSearchResults}
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          {showSearchResults && searchQuery && (
            <SearchResults
              results={searchResults}
              searchQuery={searchQuery}
              onSelect={handleDoctorSelect}
              highlightedIndex={highlightedIndex}
              onHover={handleHover}
            />
          )}
        </div>
      </div>
      <div className="main-content">
        <FilterPanel
          selectedSpecialties={selectedSpecialties}
          setSelectedSpecialties={setSelectedSpecialties}
          consultationType={consultationType}
          setConsultationType={setConsultationType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <DoctorList doctors={sortedDoctors} />
      </div>
    </div>
  );
}

export default App;
