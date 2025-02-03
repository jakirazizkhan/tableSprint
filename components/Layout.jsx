import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar"; // Import TopBar
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box display="flex">
      {/* Top Navigation Bar */}
      <TopBar />

      {/* Sidebar & Content */}
      <Box display="flex" width="100%" pt={8}>
        <Sidebar />
        <Box flexGrow={1} p={3} sx={{ backgroundColor: "#F3F3F6", minHeight: "90vh" }}>
          <Outlet /> {/* Renders Dashboard, Category, etc. */}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
