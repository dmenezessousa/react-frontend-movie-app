import React, {useState, useEffect} from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";

import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import Favorites from "./components/Favorites/Favorites"
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Nav from './components/Nav/Nav';
import "./App.css";
import MovieDetail from "./components/Movie/MovieDetail";

require("dotenv").config();
function App() {
  console.log(process.env.REACT_JWT_SECRET_KEY);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    let jwtToken = window.localStorage.getItem("jwtToken");

    if(jwtToken){
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if(decodedToken.exp < currentTime){
        window.localStorage.removeItem("jwtToken");
        setUser(null);
      }else{
        setUser({
          email: decodedToken.email,
          userName: decodedToken.userName,
        });
      };
    };
  },[])


    return (
      <div className="App" style={{backgroundColor: "#252525"}}>
          <ToastContainer />
          <Router>
          <Nav user={user} setUser={setUser}/>
            <Routes>
              <Route path="/movie-detail/:name" element={<MovieDetail/>}/>
              <Route path ="/sign-up" element={<Signup/>}/>
              <Route path ="/sign-in" element={<Signin setUser={setUser}/>}/>  
              <Route path="/protected-home" element={<PrivateRoute><ProtectedHome/></PrivateRoute>}/>
              <Route path = "/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
              <Route path = "/protected/favorites" element={<PrivateRoute><Favorites/></PrivateRoute>}/>
              <Route path="/" element={<PrivateRoute><ProtectedHome/></PrivateRoute>}/>
              <Route render={()=><h1>Not Found 404</h1>}/>
            </Routes>
          </Router>
      </div>
    );
};

export default App;
