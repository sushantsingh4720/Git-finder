import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import UserResult from "./pages/UserResult";
import RepoInfo from "./pages/RepoInfo";
import Profile from "./pages/Profile";
import { useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles";


function App() {
  const [searchText, setSearchText] = useState("");
  
  
  return (
      <BrowserRouter>
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/search" element={ <SearchResult searchText={searchText}/>} />
          <Route path="user" element={ <UserResult />} />
          <Route path="repo" element={ <RepoInfo />} />
          <Route path="*" element={ <div>404</div>} />
          <Route path="profile" element={ <Profile /> } />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
