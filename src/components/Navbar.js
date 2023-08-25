import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
function Navbar({ searchText, setSearchText }) {
  const [reRender, setReRender] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [sideNav, setSideNav] = useState(true);
  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    if (search && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await fetch(`${process.env.REACT_APP_URL}/getAccessToken${search}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          });
      };
      getAccessToken();
    }
    getUserData();
  }, [reRender, search]);

  const getUserData = async () => {
    await fetch(`${process.env.REACT_APP_URL}/getUserData`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        //  console.log(data);
        //   localStorage.setItem("user", data.avatar_url);
      });
  };

  const loginWithGithub = async () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_CLIENT_ID
    );
  };

  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   setReRender(!reRender);
  //   navigate("/");
  // };

  return (
    <div className="navbar">
      <div className=" nav-content">
        <div className="logo" onClick={(e) => navigate("/")}>
          Git Finder
        </div>
        <div className="right-side-navbor">
          <div className="flex-box search-bar-box">
            <input
              type="text"
              className="search-bar"
              placeholder="🔍 search"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={(e) => {
                const keyCode = e.code;
                if (keyCode === "Enter") {
                  if (localStorage.getItem("accessToken") === null)
                    alert("Please! Login");
                  else {
                    navigate(`/search?q=${searchText}`);
                    window.location.reload();
                  }
                }
              }}
            />
            <div
              className="search-btn"
              onClick={(e) => {
                console.log("search");
                navigate(`/search?q=${searchText}`);
                window.location.reload();
              }}
            >
              🔍
            </div>
          </div>
          <div className="user-profile">
            {localStorage.getItem("accessToken") ? (
              <div className="user-profile">
                {/* <button onClick={logout}>Logout</button> */}
                <img
                  src={userInfo.avatar_url}
                  alt="userImgUrl"
                  onClick={(e) => {
                    setSideNav(!sideNav);
                  }}
                ></img>
                <Sidenav setSideNav={setSideNav} sideNav={sideNav} />
              </div>
            ) : (
              <button onClick={loginWithGithub}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
