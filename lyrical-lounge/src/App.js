import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserLog from './Components/UserLog';
import Ratings from './Components/Ratings';
import AddEditRating from './Components/AddEditRating';
import Registration from './Components/Registration';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* route to login page */}
        <Route path="/" element={<UserLog/>} />
        {/* route to ratings page */}
        <Route path="/ratings" element={<Ratings />} />
        {/* route to registration page */}
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
