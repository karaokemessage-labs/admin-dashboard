import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/auth/Login';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

