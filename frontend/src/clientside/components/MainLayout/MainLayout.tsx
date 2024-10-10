import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MainLayout.css";

interface MainLayoutProps {
  children: ReactNode;
}

const pathMap: Record<string, string> = {
  "/half-love": "half_love",
  "/who-like-me": "who_like_me",
  "/chat": "chat",
  "/myprofile": "myprofile",
};

function MainLayout({ children }: MainLayoutProps) {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // Tính toán selectedItem dựa trên đường dẫn hiện tại
  const currentPath = location.pathname;
  const currentSelectedItem = Object.keys(pathMap).find(path => currentPath.startsWith(path)) || "";

  // Cập nhật selectedItem chỉ khi cần thiết
  if (selectedItem !== pathMap[currentSelectedItem]) {
    setSelectedItem(pathMap[currentSelectedItem]);
  }

  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header" style={{ height: "10vh" }}>
          <div
            className={`header-item header-half_love ${selectedItem === "half_love" ? "selected" : ""}`}
            onClick={() => handleItemClick("half_love", "/half-love")}
          >
            <i className="fa-solid fa-heart fa-2x"></i>
            <div>Một nửa</div>
          </div>
          <div
            className={`header-item header-who_like_me ${selectedItem === "who_like_me" ? "selected" : ""}`}
            onClick={() => handleItemClick("who_like_me", "/who-like-me")}
          >
            <i className="fa-solid fa-thumbs-up fa-2x"></i>
            <div>Ai thích tôi</div>
          </div>
          <div
            className={`header-item header-chat ${selectedItem === "chat" ? "selected" : ""}`}
            onClick={() => handleItemClick("chat", "/chat")}
          >
            <i className="fa-solid fa-message fa-2x"></i>
            <div>Trò chuyện</div>
          </div>
          <div
            className={`header-item header-profile ${selectedItem === "myprofile" ? "selected" : ""}`}
            onClick={() => handleItemClick("myprofile", "/myprofile")}
          >
            <i className="fa-solid fa-user-circle fa-2x"></i>
            <div>Cá nhân</div>
          </div>
        </div>
        <div className="content" style={{ height: "90vh" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
