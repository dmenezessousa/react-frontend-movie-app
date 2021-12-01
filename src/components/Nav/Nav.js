import React from "react";
import { Link } from "react-router-dom";

function Nav({user,setUser }) {

    let linkTittle1 = user ? user.userName : "Sign up";
    let link1 = user ? "/profile" : "/sign-up";

    let linkTittle2 = user ? "logout" : "Sign in";
    let link2 = user ? "/" : "/sign-in";
    console.log(user);

    let logoutBotton = user ? logout : ()=>{};

    function logout(){
        setUser(null);
        window.localStorage.removeItem("jwtToken");
    }   
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <Link to="/protected-home" className="navbar-brand" href="#">
        Movies
    </Link>
    <div style={{display: "flex", justifyContent: "space-between"}}className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link to={link1} className="nav-link active" aria-current="page" >
            {linkTittle1}
            </Link>
        </li>
        <li className="nav-item">
            <Link to={link2} className="nav-link" onClick={()=> logoutBotton()} >
            {linkTittle2}
            </Link>
        </li>
        <li className="nav-item">
            <Link to={"/protected/favorites"} className="nav-link" >
            Favorites
            </Link>
        </li>
        </ul>
    </div>
    </div>
</nav>
    );
}

export default Nav;