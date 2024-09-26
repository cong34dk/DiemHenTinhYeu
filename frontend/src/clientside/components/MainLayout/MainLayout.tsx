import { ReactNode, useState } from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  // State stored khi item nào được chọn
  const [selectedItem, setSelectedItem] = useState<string>("half_love");

  // Handle click vào item và điều hướng trang tương ứng
  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    console.log(path);
  }

  return (
    <>
      <div className="app">
        <div className="container">
          {/* begin header section*/}
          <div className="header" style={{ height: "10vh" }}>
            <div
              className={`header-item header-half_love ${
                selectedItem === "half_love" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("half_love", "/half-love")}
            >
              <i className="fa-solid fa-heart fa-2x"></i>
              <div>Một nửa</div>
            </div>
            <div className={`header-item header-who_like_me ${
              selectedItem === "who_like_me" ? "selected" : ""
            }`}
            onClick={() => handleItemClick("who_like_me", "/who-like-me")}
            >
              <i className="fa-solid fa-thumbs-up fa-2x"></i>
              <div>Ai thích tôi</div>
            </div>
            <div className={`header-item header-chat ${
              selectedItem === "chat"? "selected" : ""
            }`}
            onClick={() => handleItemClick("chat", "/chat")}
            >
              <i className="fa-solid fa-message fa-2x"></i>
              <div>Trò chuyện</div>
            </div>
            <div className={`header-item header-profile ${
              selectedItem === "profile"? "selected" : ""
            }`}>
              <i className="fa-solid fa-user-circle fa-2x"></i>
              <div>Cá nhân</div>
            </div>
          </div>
          {/* end header section */}

          {/* Đây là phần các section khác sẽ extend */}
          <div className="content" style={{ height: "90vh" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
