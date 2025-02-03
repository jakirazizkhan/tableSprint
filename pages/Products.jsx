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
import PreviewIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductSubCategory, setNewProductSubCategory] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductStatus, setNewProductStatus] = useState("Active");
  const [newProductImage, setNewProductImage] = useState(null);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("There was an error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProductOpen = () => {
    setOpen(true);
    setViewProduct(null);
    setEditProduct(null);
    setNewProductName("");
    setNewProductSubCategory("");
    setNewProductCategory("");
    setNewProductStatus("Active");
    setNewProductImage(null);
  };

  const handleAddProductClose = () => {
    setOpen(false);
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: newProductName,
      subCategory: newProductSubCategory,
      category: newProductCategory,
      status: newProductStatus,
      image: newProductImage,
    };
    try {
      const response = await axios.post("http://localhost:5000/api/products", newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      handleAddProductClose();
    } catch (error) {
      console.error("There was an error adding the product:", error);
    }
  };

  const handleEditProduct = async () => {
    const updatedProduct = {
      name: newProductName,
      subCategory: newProductSubCategory,
      category: newProductCategory,
      status: newProductStatus,
      image: newProductImage,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProduct._id ? response.data : product
        )
      );
      handleAddProductClose();
    } catch (error) {
      console.error("There was an error editing the product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("There was an error deleting the product:", error);
    }
  };

  const handleStatusChange = async (id) => {
    const productToUpdate = products.find((product) => product._id === id);
    const updatedStatus = productToUpdate.status === "Active" ? "Inactive" : "Active";
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { ...productToUpdate, status: updatedStatus }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? response.data : product
        )
      );
    } catch (error) {
      console.error("There was an error updating the status:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#F3F3F6" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h1>Product</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProductOpen}
        >
          Add Product
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.subCategory}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Switch
                  checked={product.status === "Active"}
                  onChange={() => handleStatusChange(product._id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => setViewProduct(product)}>
                  <PreviewIcon />
                </IconButton>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setEditProduct(product);
                    setNewProductName(product.name);
                    setNewProductSubCategory(product.subCategory);
                    setNewProductCategory(product.category);
                    setNewProductStatus(product.status);
                    setNewProductImage(product.image);
                    handleAddProductOpen();
                  }}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Product Modal */}
      <Dialog open={open} onClose={handleAddProductClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {viewProduct ? "Product Details" : editProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          {viewProduct ? (
            <>
              <Box>
                <strong>Product Name:</strong> {viewProduct.name}
              </Box>
              <Box>
                <strong>Sub Category:</strong> {viewProduct.subCategory}
              </Box>
              <Box>
                <strong>Category:</strong> {viewProduct.category}
              </Box>
              <Box>
                <strong>Status:</strong> {viewProduct.status}
              </Box>
              {viewProduct.image && (
                <img
                  src={viewProduct.image}
                  alt="Preview"
                  style={{ width: 100, height: 100, borderRadius: 4 }}
                />
              )}
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                label="Product Name"
                fullWidth
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Sub Category"
                fullWidth
                value={newProductSubCategory}
                onChange={(e) => setNewProductSubCategory(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Category"
                fullWidth
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={newProductStatus}
                  onChange={(e) => setNewProductStatus(e.target.value)}
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
                {newProductImage && (
                  <img
                    src={newProductImage}
                    alt="Preview"
                    style={{ width: 50, height: 50, marginTop: 10, borderRadius: 4 }}
                  />
                )}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProductClose} color="secondary">
            Close
          </Button>
          {editProduct ? (
            <Button onClick={handleEditProduct} color="primary" variant="contained">
              Save
            </Button>
          ) : (
            <Button onClick={handleAddProduct} color="primary" variant="contained">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
