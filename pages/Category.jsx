import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySequence, setNewCategorySequence] = useState("");
  const [newCategoryStatus, setNewCategoryStatus] = useState("Active");
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategoryOpen = () => {
    setOpen(true);
    setEditCategory(null);
    setNewCategoryName("");
    setNewCategorySequence("");
    setNewCategoryStatus("Active");
    setNewCategoryImage(null);
  };

  const handleAddCategoryClose = () => {
    setOpen(false);
  };

  const handleAddCategory = async () => {
    const categoryData = {
      name: newCategoryName,
      sequence: newCategorySequence,
      status: newCategoryStatus,
      image: newCategoryImage,
    };

    try {
      if (editCategory) {
        // Update category
        await axios.put(`http://localhost:5000/api/categories/${editCategory._id}`, categoryData);
        setCategories(categories.map((cat) =>
          cat._id === editCategory._id ? { ...cat, ...categoryData } : cat
        ));
      } else {
        // Add new category
        const response = await axios.post("http://localhost:5000/api/categories", categoryData);
        setCategories([...categories, response.data]);
      }
      handleAddCategoryClose();
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
    setNewCategorySequence(category.sequence);
    setNewCategoryStatus(category.status);
    setNewCategoryImage(category.image);
    setOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleStatusChange = async (id) => {
    const category = categories.find((cat) => cat._id === id);
    const updatedStatus = category.status === "Active" ? "Inactive" : "Active";

    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, { status: updatedStatus });
      setCategories(categories.map((cat) =>
        cat._id === id ? { ...cat, status: updatedStatus } : cat
      ));
    } catch (error) {
      console.error("Error updating category status:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#F3F3F6" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h1>Category</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCategoryOpen}
        >
          Add Category
        </Button>
      </Box>

      {/* Categories Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: 50, height: 50, borderRadius: 4 }}
                  />
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={category.status === "Active"}
                  onChange={() => handleStatusChange(category._id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{category.sequence}</TableCell>
              <TableCell>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Category Modal */}
      <Dialog open={open} onClose={handleAddCategoryClose} fullWidth maxWidth="sm">
        <DialogTitle>{editCategory ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Category Name"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Category Sequence"
            type="number"
            fullWidth
            value={newCategorySequence}
            onChange={(e) => setNewCategorySequence(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newCategoryStatus}
              onChange={(e) => setNewCategoryStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-image"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-image">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            {newCategoryImage && (
              <img
                src={newCategoryImage}
                alt="Preview"
                style={{ width: 50, height: 50, marginTop: 10, borderRadius: 4 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCategoryClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} color="primary" variant="contained">
            {editCategory ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
