import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CareerProvider } from './contexts/CareerContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { CustomCursor } from './components/common/CustomCursor';
import { Home } from './pages/Home';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { RoleDetail } from './pages/RoleDetail';
import { Compare } from './pages/Compare';
import { Saved } from './pages/Saved';
import './styles/globals.css';

function App() {
  return (
    <CareerProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/results" element={<Results />} />
                <Route path="/role/:id" element={<RoleDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/saved" element={<Saved />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </Router>
    </CareerProvider>
  );
}

export default App;
