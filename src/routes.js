import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-notes",
    component: Dashboard,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
  },
];

export default dashboardRoutes;
