import * as React from 'react';
import './App.css';
import './i18n';
import DrawerAppBar from './DrawerAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Donate from './pages/Donate.js';
import Contact from './pages/contact.js';
import About from './pages/about.js';
import Detail from './pages/Detail.js';
import ManagerLogin from './pages/ManagerLogin.js';
import { GlobalProvider } from './context/GlobalState.js';
import ManagerView from './pages/ManagerView.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <DrawerAppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/manager-view" element={<ManagerView />} />
            <Route path="/detail/:date" element={<Detail />} />
            <Route path="/donate/:eventFor/:date" element={<Donate />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </DrawerAppBar>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
