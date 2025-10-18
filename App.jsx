import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'

import StudentList from './components/StudentList';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Admission from './pages/Admission';
import Payment from './pages/Payment';
import Fees from './pages/Fees';
import AdminPanel from "./pages/AdminPage";

// Simple ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Hide navbar on these pages
  const hideNavbar = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/login';

  const user = localStorage.getItem('user');

  return (
    <>
      {/* Conditionally show navbar */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Redirect root based on login status */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Login />}
        />


        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admission"
          element={
            <ProtectedRoute>
              <Admission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentlist"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />

        {/*  Admin Panel route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
