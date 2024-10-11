import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import ChatDetail from "./clientside/components/ChatDetail/ChatDetail";
import ChatList from "./clientside/components/ChatList/ChatList";
import HalfLove from "./clientside/components/HalfLove/HalfLove";
import MyProfile from "./clientside/components/MyProfile/MyProfile";
import Login from "./clientside/components/Login/Login";
import Profile from "./clientside/components/Profile/Profile";
import { isAuthenticated } from "./clientside/utils/authUtils";


const ProtectedRoute = () => {
  const isAuth = isAuthenticated(); // Kiểm tra xem người dùng có được xác thực không

  return (
    <>
      {isAuth ? (
        <Outlet /> // Hiển thị các route con nếu được xác thực
      ) : (
        <Navigate to="/login" /> // Redirect to login nếu chưa xác thực
      )}
    </>
  );
};

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/half-love" element={<HalfLove />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:id" element={<ChatDetail />} />
            <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
   );
}

export default App;