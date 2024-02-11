import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* This is for theming */}
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F65F42",
          colorLink: "#F65F42",
        },
      }}
    >
      {/* This is for routing */}
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
