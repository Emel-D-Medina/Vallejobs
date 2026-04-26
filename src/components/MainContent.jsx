import React, { useState } from "react";
import "../styles/MainContent.css";
import { FaBriefcase } from "react-icons/fa";
import JobModal from "./JobModal";
import axios from "axios";
import { useEffect } from "react";

const MainContent = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Trabajos/Obtener",
        );
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error al obtener los trabajos:", error);
      }
    };

    fetchJobOffers();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="main-content">
      <div className="quick-jobs">EMPLEOS RÁPIDOS</div>
      {jobOffers.map((job) => (
        <div
          key={job.id}
          className="job-card"
          onClick={() => handleJobClick(job)}
        >
          <FaBriefcase className="job-icon" />
          <span className="job-title">{job.titulo}</span>
        </div>
      ))}

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default MainContent;
