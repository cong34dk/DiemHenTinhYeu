import MainLayout from "../MainLayout/MainLayout";
import { formatTimeAgo } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom"; // React Router
import "./ChatList.css";
import { useState } from "react";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
}

function ChatList() {
  // Mock data
  const initialChatData: Chat[] = [
    {
      id: 1,
      name: "Nguyễn Phương Ly",
      avatar: "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2F37575a67650be8d9d09c8448136f31ea.jpg72370cc0-e74c-4c5b-a980-b3cc9638c26a?alt=media&token=29dbf45d-d2bc-42bb-96c3-df016b18f243",
      lastMessage: "Anh ăn cơm chưa?",
      lastMessageTime: new Date(Date.now() - 10 * 60 * 1000), // 10 phút trước
    },
    {
      id: 2,
      name: "Trần Khánh Linh",
      avatar: "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2Fd9677184293fd2801dbe95c2b51a1ae5.jpg446095c6-0918-4a86-9d5a-617528e23132?alt=media&token=a7edd39f-04cf-46df-9346-51637a96d618",
      lastMessage: "Chúc anh coding vui vẻ",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: 3,
      name: "Nguyễn Thị Rose",
      avatar: "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2FBlackpink_Ros%C3%A9_Rimowa_1.jpg1253c9ae-58ac-4b38-99ea-3af2dc61e004?alt=media&token=b5c423ba-2422-4f79-93d7-ade84d804eaf",
      lastMessage: "Cho em làm wen nha ❤️😂!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    },
    
  ];

  const [chatData, setChatData] = useState<Chat[]>(initialChatData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const navigate = useNavigate();

  // Xử lý khi người dùng tìm kiếm 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Tìm kiếm theo tên hoặc tin nhắn cuối cùng
    const filteredChats = initialChatData.filter((chat) => 
        chat.name.toLowerCase().includes(query) ||
        chat.lastMessage.toLowerCase().includes(query)
    );

    setChatData(filteredChats);
  }

  // Hàm xử lý click vào một tin nhắn để xem chi tiết
  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    navigate(`/chat/${chat.id}`, { state: { chat } }); // Điều hướng đến trang chi tiết
  }



  return (
    <>
      <MainLayout>
        <div className="chat-list-container">
            <h2>Danh sách trò chuyện</h2>

            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />

            {chatData.length === 0 && <p>Không có kết quả nào phù hợp</p>}


            {/* Chat List */}
            <ul className="chat-list">
                {chatData.map((chat) => (
                    <li
                        key={chat.id}
                        className="chat-item"
                        onClick={() => handleChatClick(chat)}
                    >

                        <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                        <div className="chat-details">
                            <div className="chat-name">{chat.name}</div>
                            <div className="chat-last-message">{chat.lastMessage}</div>
                        </div>
                        <div className="chat-time">
                            {formatTimeAgo(chat.lastMessageTime)}  {/* Sử dụng hàm từ Utils */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </MainLayout>
    </>
  );
}

export default ChatList;
