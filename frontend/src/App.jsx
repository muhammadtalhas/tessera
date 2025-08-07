import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail'; 
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import UpdateUserPage from './pages/UpdateUserPage';
import PaymentForm from './components/PaymentForm';

function App() {
  const totalAmount = 50.00;
  return (
    <ChakraProvider>
      <Router>
        <AppContent />
        {/* <PaymentForm totalAmount={totalAmount} /> */}
      </Router>
    </ChakraProvider>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}
      <Routes>
          <Route path="/events" element={<EventsPage />} />
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/update_user" element={<UpdateUserPage />} />
        </Routes>

    </>
  );
}

export default App;