// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'


import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/main.scss";
import { RouterProvider } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { urls } from "./shared/constants/urls.jsx";
import Layout from "./shared/layout/index.jsx";
import ErrorPage from "./pages/error-page";


const Home = React.lazy(() => import("@/pages/Home"));
const Users = React.lazy(() => import("@/pages/Users"));
const Teams = React.lazy(() => import("@/pages/Teams"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const Reports = React.lazy(() => import("@/pages/Reports"));

const Login = React.lazy(() => import("@/pages/Login"));





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path={urls.USERS} element={<Users />} />
      <Route path={urls.TEAMS} element={<Teams />} />
      <Route path={urls.PROJECTS} element={<Projects />} />
      <Route path={urls.REPORTS} element={<Reports />} />

      <Route path={urls.LOGIN} element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <React.Suspense fallback={<h2>....loading</h2>}>
      {/* <RouterProvider router={router} /> */}
      <Layout>
        
      </Layout>
    </React.Suspense>
  </StrictMode>
);


