import logo from './logo.svg';
import './App.css';
import React from "react";
import { useLocation } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Login from './page/Login';
import Nav from './components/Nav/Nav';
import Home from './page/Home';
import Register from './page/Register';
import SearchMerchandise from './components/SearchMerchandise/SearchMerchandise';
import MerchandiseItem from './components/MerchandiseItem/MerchandiseItem';
import Order from './page/Order';
import SiteInventoryItem from './components/SiteInventoryItems/SiteInventoryItem';

import data from './config/tesData';
import CheckOrder from './page/CheckOrder';
function App() {
  return (
    <div className="App">
        <Nav />
        <div className="App-body">
          <Routes>
          {/* home */}
            <Route path="/" element={<Home />} />
          {/* login */}
            <Route path="/login" element={<Login />} />
          {/* Register */}
            <Route path="/register" element={<Register />} />  
          {/* Order */}
            <Route path="/order" element={<Order />} />
          {/* Check Order  */}
            <Route path="/checkOrder" element={<CheckOrder />} />
          {/* test component */}
            <Route path="/test" element={<SiteInventoryItem data = {data}/>} />
        
          </Routes>
        </div>
    </div>
  );
}

export default App;
