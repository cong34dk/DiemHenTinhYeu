import React, { useState } from 'react';
import './ChatList.css';

const initialChats = [
  {
    id: 1,
    name: 'Nguyen Phuong Ly',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'Hey, how are you?',
    messages: [
      { from: 'me', text: 'Hey, how are you?' },
      { from: 'Nguyen Phuong Ly', text: 'I’m good, how about you?' },
      { from: 'me', text: 'Great to hear!' },
    ],
  },
  {
    id: 2,
    name: 'Tran Anh Tuan',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'Let’s catch up later!',
    messages: [
      { from: 'me', text: 'Hey, how are you?' },
      { from: 'Tran Anh Tuan', text: 'Let’s catch up later!' },
    ],
  },
  // Thêm nhiều cuộc trò chuyện khác nếu cần
];

const ChatList: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);

  return (
    <div className="chat-container">
      <div className="chat-list">
        {initialChats.map(chat => (
          <div 
            key={chat.id} 
            className={`chat-item ${selectedChat.id === chat.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            <img src={chat.avatar} alt={chat.name} className="avatar" />
            <div className="chat-info">
              <h4>{chat.name}</h4>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-box">
        <div className="chat-box-header">
          <img src={selectedChat.avatar} alt={selectedChat.name} className="avatar" />
          <h4>{selectedChat.name}</h4>
        </div>

        <div className="chat-messages">
          {selectedChat.messages.map((msg, index) => (
            <div 
              key={index} 
              className={`chat-message ${msg.from === 'me' ? 'sent' : 'received'}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
