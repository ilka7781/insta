import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./components/pages/main/main";
import Reg from "./components/pages/register/reg";
import Profile from "./components/pages/profilePage/profile";
import Footer from "./components/pages/footer/footer";
import Login from "./components/pages/login/login";
import Protected from "./components/pages/protected";
import Sidebar from "./components/pages/sidebar/sidebar";
import PostDetail from "./components/pages/profilePage/posts/postsDetail/postDetail";
import ProfileDetail from "./components/pages/profilePage/profileDetail/profileDetail";
import ProfileEdit from "./components/pages/profilePage/profileEdit/profileEdit";

function App() {
  return (
    <div className="App">
       <Sidebar/>
      <Routes>
          <Route path='*' element={ <Main/> }/>
          <Route path='/' element={ <Main/> }/>
          <Route path='/reg' element={<Reg/>}/>
          <Route path='/profile' element={ <Profile/>}/>
          <Route path='/profileDetail' element={<ProfileDetail/> }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/postDetail' element={ <PostDetail/> }/>
          <Route path='/profileEdit' element={ <ProfileEdit/> }/>
      </Routes>

    </div>
  );
}

export default App;
