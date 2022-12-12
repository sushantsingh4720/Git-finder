import React, { useState, useEffect } from "react";

// import { useNavigate  } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUserData = async () => {
      await fetch(`${process.env.REACT_APP_URL}getUserData`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUser(data);
        });
    };
    getUserData();
  }, []);
  // const navigate = useNavigate();
  const date = new Date(user.created_at).toDateString();

  return (
    <div className="profile page-box flex-box">
      <div className="profile-container">
        <img src={user.avatar_url} alt="👨" className="profile-img" />
        <div className="profile-item">
          <div className="profile-row">
            <div className="profile-row-title">Id</div>
            <div>{user.id}</div>
          </div>
          <div className="profile-row">
            <div className="profile-row-title">Username</div>
            <div>{user.login}</div>
          </div>
          <div className="profile-row">
            <div className="profile-row-title">Full Name</div>
            <div> {user.name} </div>
          </div>
          <div className="profile-row">
            <div className="profile-row-title">Created_at</div>
            <div>{date}</div>
          </div>
          {/* <div className="profile-row">
                        <div className="profile-row-title">Email</div>
                        <div>sushantsingh4720@gmail.com</div>
                    </div> */}
          {/* <div className="profile-row">
                        <div className="profile-row-title">Department</div>
                        <div>cse</div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
