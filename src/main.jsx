import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import "../i18n/index.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./routers/Dashboard/Dashboard.jsx";
import List from "./routers/MoveList/List.jsx";
import Home from "./routers/Home/Home.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/list", element: <List /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
