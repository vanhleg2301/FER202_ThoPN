import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import PhotoDetail from "./components/pages/photo.js/PhotoDetail";
import Login from "./components/pages/sign/Login";
import Regis from "./components/pages/sign/Regis";
import Profile from "./components/pages/profile/Profile";
import { AuthProvider } from "./context/Context";
import Forgot from "./components/pages/sign/Forgot";
import Album from "./components/pages/album/Album";
import ErrorPage from "./components/pages/error/ErrorPage";
import AlbumPhoto from "./components/pages/album/AlbumPhoto";
import ChatRoom from "./components/pages/chat/ChatRoom";
import ActiveCode from "./components/pages/sign/ActiveCode";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ErrorPage />} />
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />{" "}
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/regis' element={<Regis />} />
            <Route path='/auth/active-code/:key' element={<ActiveCode />} />
            <Route path='/auth/forgot' element={<Forgot />} />
            <Route path='/auth/profile' element={<Profile />} />
            <Route path='/album' element={<Album />} />
            <Route path='/album/:albumId' element={<AlbumPhoto />} />
            <Route path='/photo/:photoId' element={<PhotoDetail />} />
            <Route path='/chat' element={<ChatRoom />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
