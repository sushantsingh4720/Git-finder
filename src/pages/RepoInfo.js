import React, { useEffect, useState } from "react";

const RepoInfo = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const owner = queryParams.get("u");
  const repo = queryParams.get("r");
  const [repoInfo, setRepoInfo] = useState("");

  useEffect(() => {
    const search = async () => {
      await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response) {
            setRepoInfo(response);
          }
        });
    };
    search();
  }, [owner, repo]);
  // console.log(repoInfo);
  const date = new Date(repoInfo.created_at).toDateString();

  return (
    <div className="repo_container">
      <div className="profile-item">
        <div className="profile-row">
          <div className="profile-row-title">Repository Name</div>
          <div className="profile-row-title-description">{repoInfo.name}</div>
        </div>
        <div className="profile-row">
          <div className="profile-row-title">Full Name</div>
          <div className="profile-row-title-description">
            {repoInfo.full_name}
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-row-title">Language</div>
          <div className="profile-row-title-description">
            {repoInfo.language}
          </div>
        </div>

        {repoInfo.description === null ? (
          ""
        ) : (
          <div className="profile-row">
            <div className="profile-row-title">Description</div>
            <div className="profile-row-title-description">
              {repoInfo.description}
            </div>
          </div>
        )}
        <div className="profile-row">
          <div className="profile-row-title">Created_at</div>
          <div className="profile-row-title-description">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
