// import React from "react";
import React, { Suspense } from "react";
// import { createRoot } from "react-dom/client";
import "@/main.scss";
import { RouterProvider, Navigate } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { urls } from "./shared/constants/urls.jsx";
import Layout from "./shared/layout/index.jsx";
import ErrorPage from "./pages/error-page";
import { useSelector } from "react-redux";

const Home = React.lazy(() => import("@/pages/Home"));
const Users = React.lazy(() => import("@/pages/Users"));
const Teams = React.lazy(() => import("@/pages/Teams"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const Reports = React.lazy(() => import("@/pages/Reports"));

const Login = React.lazy(() => import("@/pages/Login"));

function App() {
  const { user } = useSelector((state) => state.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {Object.keys(user || {}).length ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={urls.USERS} element={<Users />} />
            <Route path={urls.TEAMS} element={<Teams />} />
            <Route path={urls.PROJECTS} element={<Projects />} />
            <Route path={urls.REPORTS} element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
