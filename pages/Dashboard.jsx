import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import logo from "../assets/color.png"

const Dashboard = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", flexDirection: "column" }}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Layout */}
      
        <Sidebar />

        {/* Content Area */}
      
          
          {children || <h1 style={{ textAlign: "center" }}>
          <img src={logo} alt="Tale-Sprint" style={{ width: "350px", height: "100px", display: "block", margin: "auto" }} />
          <br />
          Welcome to TableSprint Admin</h1>}
        </Box>
    
   
  );
};

export default Dashboard;
