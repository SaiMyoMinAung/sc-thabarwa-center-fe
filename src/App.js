import * as React from 'react';
import DrawerAppBar from './DrawerAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Donate from './pages/Donate.js';
import Contact from './pages/contact.js';
import About from './pages/about.js';
import Detail from './pages/Detail.js';
import './App.css';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <DrawerAppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:date" element={<Detail />} />
          <Route path="/donate/:eventFor/:date" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </DrawerAppBar>
    </BrowserRouter>
  );
}

export default App;
