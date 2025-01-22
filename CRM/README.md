# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```js
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
    return new Promise((resolve) => setTimeout(() => resolve([...users]), 0)); // Ensure immutability
  },

  addUser: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: Date.now() }; // Avoid mutating the input directly
        users = [...users, newUser];
        // Create a new array with the new user
        if (newUser.teamId) {
          teams = teams.map((team) =>
            team.id === newUser.teamId
              ? { ...team, userIds: [...team.userIds, newUser.id] }
              : team
          );
          localStorage.setItem("teams", JSON.stringify(teams));
        }
        localStorage.setItem("users", JSON.stringify(users));
        //  mail , if user.mail = users.includes throw Error
        resolve(newUser);
      }, 500);
    });
  },

  /*
  
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
  */


  editUser: async (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users = users.map((u) => (u.id === user.id ? { ...u, ...user } : u)); // Use immutability
        if (user?.teamId) {
          // Update teams
          teams = teams?.map((team) => {
            if (team?.userIds?.includes(user?.id)) {
              return {
                ...team,
                userIds: team?.userIds?.filter((id) => id !== user?.id),
              };
            }
            return team;
          });
          teams = teams?.map((team) =>
            team?.id === user.teamId
              ? { ...team, userIds: [...team.userIds, user.id] }
              : team
          );
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(user);
      }, 500);
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userToDelete = users.find((u) => u.id === id);
        if (userToDelete && userToDelete.teamId) {
          teams = teams.map((team) =>
            team.id === userToDelete.teamId
              ? { ...team, userIds: team.userIds.filter((uid) => uid !== id) }
              : team
          );
        }
        users = users.filter((u) => u.id !== id);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(id);
      }, 500);
    });
  },

  fetchTeams: async () => {
    return new Promise((resolve) => setTimeout(() => resolve([...teams]), 0));
  },

  addTeam: async (team) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTeam = { ...team, id: Date.now() };
        teams = [...teams, newTeam];
        localStorage.setItem("teams", JSON.stringify(teams));
        resolve(newTeam);
      }, 500);
    });
  },

  editTeam: async (team) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        teams = teams.map((t) => (t.id === team.id ? { ...t, ...team } : t));
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

  fetchProjects: async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve([...projects]), 0)
    );
  },

  addProject: async (project) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject = { ...project, id: Date.now() };
        projects = [...projects, newProject];
        localStorage.setItem("projects", JSON.stringify(projects));
        resolve(newProject);
      }, 500);
    });
  },

  editProject: async (project) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        projects = projects.map((p) =>
          p.id === project.id ? { ...p, ...project } : p
        );
        localStorage.setItem("projects", JSON.stringify(projects));
        resolve(project);
      }, 500);
    });
  },

  fetchReports: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...reports]);
      }, 0);
    });
  },

  addReport: async (report) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReport = { ...report, id: Date.now() };
        reports = [...reports, newReport];
        localStorage.setItem("reports", JSON.stringify(reports));
        resolve(newReport);
      }, 500);
    });
  },

  editReport: async (report) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        reports = reports.map((r) =>
          r.id === report.id ? { ...r, ...report } : r
        );
        localStorage.setItem("reports", JSON.stringify(reports));
        resolve(report);
      }, 500);
    });
  },
};
```
