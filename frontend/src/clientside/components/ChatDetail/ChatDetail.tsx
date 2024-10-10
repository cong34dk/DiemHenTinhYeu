import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import "./ChatDetail.css";
import MainLayout from "../MainLayout/MainLayout";

function ChatDetail() {
  const location = useLocation();
  const { chat } = location.state; // Lấy dữ liệu từ `ChatList`

  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([
    chat.lastMessage,
  ]);

  const [image, setImage] = useState<File | null>(null); 
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Xử lý chọn file ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Xử lý upload ảnh lên Firebase Storage
  const handleUploadImage = () => {
    return new Promise<string>((resolve, reject) => {
      if (!image) return resolve("");

      const storageRef = ref(storage, `images/${image.name + uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
            resolve(url); // Trả về URL sau khi upload xong
          });
        }
      );
    });
  };

  // Xử lý gửi tin nhắn
  const handleSendMessage = async () => {
    let imageUrl = "";
    if (image) {
      imageUrl = await handleUploadImage(); // Upload ảnh trước và lấy URL
    }

    // Sau khi upload ảnh (nếu có), thêm tin nhắn vào lịch sử chat
    const newMessage = {
      text: message,
      image: imageUrl,
    };

    if (message.trim() || imageUrl) {
      setChatHistory([...chatHistory, newMessage]);
      setMessage(""); // Clear text input
      setImage(null);  // Clear image input
    }
  };

  return (
    <MainLayout>
      <div className="chat-detail-container">
        <div className="chat-header">
          <img
            className="chat-avatar-large"
            src={chat.avatar}
            alt={chat.name}
          />
          <h2>{chat.name}</h2>
        </div>

        {/* Hiển thị lịch sử chat */}
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className="chat-bubble">
              <p>{msg.text}</p>
              {msg.image && <img src={msg.image} alt="image" className="chat-image" />}
            </div>
          ))}
        </div>

        {/* Khu vực gửi tin nhắn */}
        <div className="chat-input-section">
          <textarea
            className="chat-input"
            rows={3}
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <input type="file" onChange={handleImageChange} />
          {progress > 0 && <p>Upload Progress: {progress}%</p>}
          <button className="send-button" onClick={handleSendMessage}>
            Gửi
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default ChatDetail;
