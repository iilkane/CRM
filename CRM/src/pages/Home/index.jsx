// import React from "react";
import { FaUser, FaUsers, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";

import { urls } from "@/shared/constants/urls"; 
import { mockAPI } from "@/shared/redux/api/data";

const Index = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await mockAPI.fetchUsers();
      const fetchedTeams = await mockAPI.fetchTeams();
      const fetchedProjects = await mockAPI.fetchProjects();
      const fetchedReports = await mockAPI.fetchReports();

      setUsersCount(fetchedUsers.length);
      setTeamsCount(fetchedTeams.length);
      setProjectsCount(fetchedProjects.length);
      setReportsCount(fetchedReports.length);
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      {/* Users */}
      <div className="column">
        <Link to={urls.USERS}>
          <div className="icon-container">
            <FaUser size={24} />
          </div>
          <div className="text-container">
            <span className="title">Users ({usersCount})</span>
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
            <span className="title">Teams ({teamsCount})</span>
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
            <span className="title">Projects ({projectsCount})</span>
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
            <span className="title">Reports ({reportsCount})</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;

