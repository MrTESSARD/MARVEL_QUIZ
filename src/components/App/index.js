import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../../App.css';
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup/Index';
import ErrorPage from '../ErrorPage';
import ForgetPasword from '../ForgetPassword';
import { BrowserRouter, renderMatches } from 'react-router-dom';
import { IconContext } from 'react-icons';


function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>

        <Header />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/welcome' element={<Welcome />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPasword />} />
          <Route path="*" element={<ErrorPage />} />

        </Routes>

        <Footer />
      </IconContext.Provider>

    </Router>
  )
}

export default App;
