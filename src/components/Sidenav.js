// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidenav(flag) {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("accessToken");

    navigate("/");
  };
  return (
    <div
      className={`nav-features flex-box ${
        flag.flag ? "nav-features-active" : ""
      }`}
    >
      <Link to={"/"} className="nav-feature" onClick={(e)=>{console.log(flag.flag=!flag.flag)}}>
        Home
      </Link>
      <Link to={"/profile"} className="nav-feature" onClick={(e)=>{console.log(flag.flag=!flag.flag)}}>
        Profile
      </Link>
      {/* <Link to={"/file-tracker-frontend/files"} className="nav-feature">
        My Files
      </Link> */}
      {/* <Link to={"/file-tracker-frontend/about"} className="nav-feature">
        About Us
      </Link> */}
      <div className="nav-feature" onClick={(e) => logout()}>
        Logout
      </div>
    </div>
  );
}
