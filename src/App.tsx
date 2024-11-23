import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList/CountryList';
import CountryDetails from './components/CountryDetails/CountryDetails';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
