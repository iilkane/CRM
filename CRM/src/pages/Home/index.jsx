import React from "react";
import { FaUser, FaUsers, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // react-router-dom'dan Link bileşeni

// urls dosyasını içeri aktar
import { urls } from "@/shared/constants/urls"; 

const Index = () => {
  return (
    <div className="row">
      {/* Users */}
      <div className="column">
        <Link to={urls.USERS}>
          <div className="icon-container">
            <FaUser size={24} />
          </div>
          <div className="text-container">
            <span className="title">Users</span>
            <span className="subtitle">Welcome</span>
          </div>
        </Link>
      </div>

      {/* Teams */}
      <div className="column">
        <Link to={urls.TEAMS}>
          <div className="icon-container">
            <FaUsers size={24} />
          </div>
          <div className="text-container">
            <span className="title">Teams</span>
            <span className="subtitle">Manage teams</span>
          </div>
        </Link>
      </div>

      {/* Projects */}
      <div className="column">
        <Link to={urls.PROJECTS}>
          <div className="icon-container">
            <FaClipboardList size={24} />
          </div>
          <div className="text-container">
            <span className="title">Projects</span>
            <span className="subtitle">Track progress</span>
          </div>
        </Link>
      </div>

      {/* Reports */}
      <div className="column">
        <Link to={urls.REPORTS}>
          <div className="icon-container">
            <FaFileAlt size={24} />
          </div>
          <div className="text-container">
            <span className="title">Reports</span>
            <span className="subtitle">Generate insights</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;

