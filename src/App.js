import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import './App.css';

import Navigation from './components/Navigation/Navigation';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
