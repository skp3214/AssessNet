import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TestEnvironment from './components/TestEnvironment';
import PrivateRoute from './components/PrivateRoute';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test-env" element={
            <PrivateRoute>
              <TestEnvironment />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App