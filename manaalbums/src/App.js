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
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";
import Change from "./components/pages/sign/Change";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ErrorPage />} />
          <Route element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/regis' element={<Regis />} />
            </Route>

            <Route
              path='/auth/active-code/:activeCode'
              element={<ActiveCode />}
            />
            <Route path='/auth/forgot-password' element={<Forgot />} />
            <Route path='/' element={<Home />} />
            <Route path='/photo/:photoId' element={<PhotoDetail />} />

            <Route element={<PrivateRoute />}>
              <Route path='/auth/change-password' element={<Change />} />
              <Route path='/auth/profile' element={<Profile />} />
              <Route path='/album' element={<Album />} />
              <Route path='/album/:albumId' element={<AlbumPhoto />} />
              <Route path='/chat' element={<ChatRoom />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
