import React from 'react';
import LoginPage from './frontpage_login_register/loginpage';
import RegisterPage from './frontpage_login_register/registerpage';
import DefaultMenu from './menuviews/defaultmenu';
import ChartView from './menuviews/menuchartview';
import BrowserBar from './frontpage_login_register/browserbar';
import SharedView from './frontpage_login_register/customlinkview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FrontPage from './frontpage_login_register/frontpage';
import ShowAll from './frontpage_login_register/showall';




function App() {  
  return (
    <BrowserRouter>
    <div className='router' data-testid="router">
    <BrowserBar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<DefaultMenu />} />
        <Route path="/menu/view" element={<ChartView />} />
        <Route path="/showall" element={<ShowAll />} />
        <Route path="/shared">
          <Route path=":id" element={<SharedView />} />
        </Route>
        </Routes>
    </div>
    
    </BrowserRouter>
    
  

  );
}


export default App;
