import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";

// components
import MyNavbar from "./components/navbar";


// pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import DetailsPage from "./pages/Details";
import OrderPage from "./pages/Order";
import OrderDetailPage from "./pages/OrderDetail";


function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/orders" element={<OrderPage />} />
        <Route path="/book/view/:bookId" element={<DetailsPage />} />
        <Route path="/book/order/:bookId" element={<OrderDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
