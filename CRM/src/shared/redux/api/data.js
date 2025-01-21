let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    teamId: 1,
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    teamId: 2,
  },
];

let teams = JSON.parse(localStorage.getItem("teams")) || [
  { id: 1, name: "Development", userIds: [] },
  { id: 2, name: "Design", userIds: [] },
];

let projects = JSON.parse(localStorage.getItem("projects")) || [
  { id: 1, projectName: "Project A" },
];

let reports = JSON.parse(localStorage.getItem("reports")) || [
  {
    id: 1,
    user: "John Doe",
    description: "Initial report description",
    createDate: "2025-01-20",
    projectName: "Project A",
  },
];

export const mockAPI = {
  fetchUsers: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(users), 0));
  },

  addUser: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        user.id = Date.now(); 
        users.push(user);
        if (user.teamId) {
          teams = teams.map((team) => {
            if (team.id === user.teamId) {
              return { ...team, userIds: [...team.userIds, user.id] };
            }
            return team;
          });
          localStorage.setItem("teams", JSON.stringify(teams));
        }
  
        localStorage.setItem("users", JSON.stringify(users));
        resolve(user);
      }, 500);
    });
  },
  

  editUser: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find((u) => u.id === user.id);

        if (existingUser && existingUser.teamId !== user.teamId) {
          teams = teams.map((team) => {
            if (team.id === existingUser.teamId) {
              return {
                ...team,
                userIds: team.userIds.filter((id) => id !== user.id),
              };
            }
            return team;
          });

          teams = teams.map((team) => {
            if (team.id === user.teamId) {
              return { ...team, userIds: [...team.userIds, user.id] };
            }
            return team;
          });
        }

        users = users.map((u) => (u.id === user.id ? user : u));
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("teams", JSON.stringify(teams)); // Persist teams
        resolve(user);
      }, 500);
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userToDelete = users.find((u) => u.id === id);

        if (userToDelete && userToDelete.teamId) {
          teams = teams.map((team) => {
            if (team.id === userToDelete.teamId) {
              return {
                ...team,
                userIds: team.userIds.filter((uid) => uid !== id),
              };
            }
            return team;
          });
        }

        users = users.filter((u) => u.id !== id);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(id);
      }, 500);
    });
  },

  // TEAMS

  addTeam: async (team) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        team.id = Date.now();
        teams.push(team);
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(team);
      }, 500);
    });
  },

  editTeam: async (team) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        teams = teams.map((t) => (t.id === team.id ? team : t));
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(team);
      }, 500);
    });
  },

  deleteTeam: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        teams = teams.filter((team) => team.id !== id);

        users = users.map((user) => {
          if (user.teamId === id) {
            return { ...user, teamId: null };
          }
          return user;
        });

        localStorage.setItem("teams", JSON.stringify(teams));
        localStorage.setItem("users", JSON.stringify(users));
        resolve(id);
      }, 500);
    });
  },

  addProject: async (project) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        project.id = Date.now();
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
        resolve(project);
      }, 500);
    });
  },

  editProject: async (project) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        projects = projects.map((p) => (p.id === project.id ? project : p));
        localStorage.setItem("projects", JSON.stringify(projects));
        resolve(project);
      }, 500);
    });
  },

  addReport: async (report) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        report.id = Date.now();
        reports.push(report);
        localStorage.setItem("reports", JSON.stringify(reports));
        resolve(report);
      }, 500);
    });
  },

  editReport: async (report) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        reports = reports.map((r) => (r.id === report.id ? report : r));
        localStorage.setItem("reports", JSON.stringify(reports));
        resolve(report);
      }, 500);
    });
  },

  fetchTeams: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(teams), 0));
  },

  fetchReports: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(reports), 0));
  },

  fetchProjects: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(projects), 0));
  },
};
