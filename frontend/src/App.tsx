import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatDetail from "./clientside/components/ChatDetail/ChatDetail";
import ChatList from "./clientside/components/ChatList/ChatList";
import HalfLove from "./clientside/components/HalfLove/HalfLove";
import MyProfile from "./clientside/components/MyProfile/MyProfile";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/half-love" element={<HalfLove />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatDetail />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
   );
}

export default App;