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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SubCategory = () => {
  const [open, setOpen] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [newSubCategorySequence, setNewSubCategorySequence] = useState("");
  const [newSubCategoryStatus, setNewSubCategoryStatus] = useState("Active");
  const [newSubCategoryImage, setNewSubCategoryImage] = useState(null);
  const [newSubCategoryCategory, setNewSubCategoryCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subcategories")
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the subcategories:", error);
      });
  }, []);

  const handleAddSubCategoryOpen = () => {
    setOpen(true);
    setEditSubCategory(null);
    setNewSubCategoryName("");
    setNewSubCategorySequence("");
    setNewSubCategoryStatus("Active");
    setNewSubCategoryImage(null);
    setNewSubCategoryCategory("");
  };

  const handleAddSubCategoryClose = () => {
    setOpen(false);
  };

  const handleAddSubCategory = () => {
    const subCategoryData = {
      name: newSubCategoryName,
      categoryName: newSubCategoryCategory,
      sequence: newSubCategorySequence,
      status: newSubCategoryStatus,
      image: newSubCategoryImage,
    };

    if (editSubCategory) {
      // Update existing subcategory
      axios
        .put(`http://localhost:5000/api/subcategories/${editSubCategory._id}`, subCategoryData)
        .then((response) => {
          const updatedSubCategories = subCategories.map((subCat) =>
            subCat._id === editSubCategory._id ? response.data : subCat
          );
          setSubCategories(updatedSubCategories);
          handleAddSubCategoryClose();
        })
        .catch((error) => console.error("Error updating subcategory:", error));
    } else {
      // Add new subcategory
      axios
        .post("http://localhost:5000/api/subcategories", subCategoryData)
        .then((response) => {
          setSubCategories([...subCategories, response.data]);
          handleAddSubCategoryClose();
        })
        .catch((error) => console.error("Error adding subcategory:", error));
    }
  };

  const handleEditSubCategory = (subCategory) => {
    setEditSubCategory(subCategory);
    setNewSubCategoryName(subCategory.name);
    setNewSubCategoryCategory(subCategory.categoryName);
    setNewSubCategorySequence(subCategory.sequence);
    setNewSubCategoryStatus(subCategory.status);
    setNewSubCategoryImage(subCategory.image);
    setOpen(true);
  };

  const handleDeleteSubCategory = (id) => {
    axios
      .delete(`http://localhost:5000/api/subcategories/${id}`)
      .then(() => {
        setSubCategories(subCategories.filter((subCat) => subCat._id !== id));
      })
      .catch((error) => console.error("Error deleting subcategory:", error));
  };

  const handleStatusChange = (id) => {
    const updatedSubCategories = subCategories.map((subCat) =>
      subCat._id === id
        ? { ...subCat, status: subCat.status === "Active" ? "Inactive" : "Active" }
        : subCat
    );
    setSubCategories(updatedSubCategories);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSubCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredSubCategories = subCategories.filter((subCat) =>
    subCat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3} sx={{ backgroundColor: "#F3F3F6" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h1>SubCategory</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddSubCategoryOpen}
        >
          Add Subcategory
        </Button>
      </Box>

      {/* Search Box */}
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          label="Search Subcategory"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton position="start">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Subcategories Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Subcategory Name</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSubCategories.map((subCategory, index) => (
            <TableRow key={subCategory._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{subCategory.name}</TableCell>
              <TableCell>{subCategory.categoryName}</TableCell>
              <TableCell>
                {subCategory.image && (
                  <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    style={{ width: 50, height: 50, borderRadius: 4 }}
                  />
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={subCategory.status === "Active"}
                  onChange={() => handleStatusChange(subCategory._id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{subCategory.sequence}</TableCell>
              <TableCell>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => handleEditSubCategory(subCategory)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteSubCategory(subCategory._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Subcategory Modal */}
      <Dialog open={open} onClose={handleAddSubCategoryClose} fullWidth maxWidth="sm">
        <DialogTitle>{editSubCategory ? "Edit Subcategory" : "Add Subcategory"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Subcategory Name"
            fullWidth
            value={newSubCategoryName}
            onChange={(e) => setNewSubCategoryName(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Category Name"
            fullWidth
            value={newSubCategoryCategory}
            onChange={(e) => setNewSubCategoryCategory(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Subcategory Sequence"
            type="number"
            fullWidth
            value={newSubCategorySequence}
            onChange={(e) => setNewSubCategorySequence(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newSubCategoryStatus}
              onChange={(e) => setNewSubCategoryStatus(e.target.value)}
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
            {newSubCategoryImage && (
              <img
                src={newSubCategoryImage}
                alt="Preview"
                style={{ width: 50, height: 50, marginTop: 10, borderRadius: 4 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSubCategoryClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSubCategory} color="primary" variant="contained">
            {editSubCategory ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubCategory;
