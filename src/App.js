import * as React from 'react';
import DrawerAppBar from './DrawerAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Donate from './pages/Donate.js';
import Contact from './pages/contact.js';
import About from './pages/about.js';
import './App.css';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <DrawerAppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </DrawerAppBar>
    </BrowserRouter>
  );
}

export default App;
