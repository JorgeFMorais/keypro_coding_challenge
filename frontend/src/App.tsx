import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map.tsx';
import Auth from './components/Auth.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;