import React from "react";
import "../styles/DoctorList.css";

const DoctorList = ({ doctors }) => {
  return (
    <div className="doctor-list">
      {doctors && doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="doctor-card"
            data-testid="doctor-card"
          >
            <div className="doctor-info-container">
              <div className="doctor-image">
                <img
                  src={doctor.photo || "https://via.placeholder.com/100"}
                  alt={doctor.name}
                  className="doctor-avatar"
                />
              </div>
              <div className="doctor-info">
                <h2 data-testid="doctor-name">{doctor.name}</h2>
                <p className="specialty" data-testid="doctor-specialty">
                  {doctor.specialities?.[0]?.name || "General Physician"}
                </p>
                <p className="qualification">
                  {doctor.doctor_introduction?.split(",")[0] || "MBBS"}
                </p>
                <p className="experience" data-testid="doctor-experience">
                  {doctor.experience}
                </p>
                <div className="clinic-info">
                  <div className="clinic-name">
                    <span className="clinic-icon">🏥</span>
                    {doctor.clinic?.name}
                  </div>
                  <div className="location">
                    <span className="location-icon">📍</span>
                    {doctor.clinic?.address?.locality}
                  </div>
                </div>
              </div>
              <div className="fee-section">
                <p className="fee" data-testid="doctor-fee">
                  {doctor.fees}
                </p>
                <button className="book-appointment">Book Appointment</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          No doctors found. Please try different filters.
        </div>
      )}
    </div>
  );
};

export default DoctorList;
