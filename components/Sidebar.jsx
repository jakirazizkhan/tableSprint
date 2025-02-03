import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", backgroundColor: "#1A1A1A", color: "white" },
      }}
    >
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          TableSprint
        </Typography>
      </Box>

      <List>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemIcon sx={{ color: "white" }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate("/category")}>
          <ListItemIcon sx={{ color: "white" }}><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button onClick={() => navigate("/subcategory")}>
          <ListItemIcon sx={{ color: "white" }}><SubdirectoryArrowRightIcon /></ListItemIcon>
          <ListItemText primary="Subcategory" />
        </ListItem>
        <ListItem button onClick={() => navigate("/products")}>
          <ListItemIcon sx={{ color: "white" }}><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
