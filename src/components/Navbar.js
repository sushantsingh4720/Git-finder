import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
function Navbar({ searchText, setSearchText }) {
  const [reRender, setReRender] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const [sideNav, setSideNav] = useState(true);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const codeParams = queryParams.get("code");
    if (codeParams && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          });
      };
      getAccessToken();
    }
    getUserData();
  }, [reRender]);

  const getUserData = async () => {
    await fetch("http://localhost:4000/getUserData", {
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
                console.log("search")
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
                <Sidenav flag={sideNav} />
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
