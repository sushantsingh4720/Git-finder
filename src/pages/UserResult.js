import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function UserResult() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const user = queryParams.get("u");
  const [userResult, setUserResult] = useState(null);
  const [repoResult, setRepoResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      let resp = await fetch(`https://api.github.com/users/${user}`);
      let response = await resp.json();
    //   console.log(response);
      if (response) setUserResult(response);

      resp = await fetch(`https://api.github.com/users/${user}/repos`);
      response = await resp.json();
    //   console.log(response);
      if (response) setRepoResult(response);
    };
    search();
  }, [user]);

  return (
    <div className="flex-box">
      <div className="container  flex-box search-item-container">
        {userResult && (
          <div className="user-container">
            <div className="result-user-img-box">
              <img
                src={userResult.avatar_url}
                className="result-user-img"
                alt="userProfile"
              />
              <div>
                <h3>{userResult.name}</h3>
                <div>{userResult.login}</div>
              </div>
            </div>
            <div className="result-repo">
              <div className="repo-count-box">
                Repositories: {repoResult.length}
              </div>
              {repoResult.length !== 0 &&
                repoResult.map((repo) => {
                  return (
                    <div
                      className="repo-item flex-col-box"
                      onClick={(e) =>
                        navigate(`/repo?u=${userResult.login}&r=${repo.name}`)
                      }
                      key={repo.id}
                    >
                      <div style={{ fontWeight: 700 }}>{repo.full_name}</div>
                      <div style={{ fontSize: "12px" }}>{repo.language}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserResult;
