import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  // ✅ Import Layout
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import LoginPage from "./pages/LoginPage";
import SubCategory from "./pages/Subcategory";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
