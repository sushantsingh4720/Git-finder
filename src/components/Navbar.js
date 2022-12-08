import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar({ searchText, setSearchText }) {
  const [reRender, setReRender] = useState(false);
  const [userImgUrl, setUserImgUrl] = useState("");
  const navigate = useNavigate();
  
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
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
              getUserData();
            }
          });
      };
      getAccessToken();
    }
  }, [ reRender]);

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
        setUserImgUrl("https://avatars.githubusercontent.com/u/95166365?v=4");
      });
  };

  const loginWithGithub = async () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID
    );
  };
  
const logout=()=>{
  localStorage.removeItem("accessToken");
  setReRender(!reRender);
  navigate("/");
}
  

  return (
    <div className="navbar">
      <div className=" nav-content">
        <div className="logo" onClick={(e) => navigate("/")}>
          Git Finder
        </div>
        <div className="flex-box search-bar-box">
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 search"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={(e) => {
              const keyCode = e.code;
              if (keyCode === "Enter") {
                navigate(`/search?q=${searchText}`);
                window.location.reload();
              }
            }}
          />
          <div
            className="search-btn"
            onClick={(e) => {
              navigate(`/search?q=${searchText}`);
              window.location.reload();
            }}
          >
            🔍
          </div>
        </div>
        <div>
          { localStorage.getItem("accessToken")? (
            <div>
              <button onClick={logout}>Logout</button>
              {/* <img src={userImgUrl} alt="userImgUrl"></img> */}
            </div>
          ) : (
            <button onClick={loginWithGithub}>Login with github</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
