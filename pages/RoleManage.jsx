import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
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
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";

const RoleManage = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", slug: "react-basics", duration: "5 hours" },
    { id: 2, title: "Advanced React", slug: "advanced-react", duration: "8 hours" },
    { id: 3, title: "React with TypeScript", slug: "react-typescript", duration: "6 hours" },
    { id: 4, title: "Shopify", slug: "shopify-basics", duration: "10 hours" },
    { id: 5, title: "WordPress", slug: "wordpress-basics", duration: "15 hours" },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [open, setOpen] = useState(false); // For dialog state
  const [newCourse, setNewCourse] = useState({
    title: "",
    slug: "",
    duration: "",
  }); // To hold new course data

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddCourseOpen = () => {
    setOpen(true);
  };

  const handleAddCourseClose = () => {
    setOpen(false);
    setNewCourse({ title: "", slug: "", duration: "" }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.slug || !newCourse.duration) {
      alert("Please fill out all fields!");
      return;
    }
    setCourses([
      ...courses,
      { id: courses.length + 1, ...newCourse }, // Add new course with an auto-increment ID
    ]);
    handleAddCourseClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={3}  sx={{ backgroundColor: '#F3F3F6' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h1>Courses</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCourseOpen}
        >
          Add Course
        </Button>
      </Box>

      {/* Search Box */}
      <TextField
        placeholder="Search Courses"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Courses Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Courses Title</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Courses Duration</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCourses.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.slug}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <RemoveRedEyeIcon />
                </IconButton>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(course.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Course Dialog */}
      <Dialog open={open} onClose={handleAddCourseClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Course Title"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Slug"
            name="slug"
            value={newCourse.slug}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Duration"
            name="duration"
            value={newCourse.duration}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCourseClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManage;
