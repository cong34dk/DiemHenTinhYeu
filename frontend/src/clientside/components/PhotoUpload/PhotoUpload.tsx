import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function PhotoUpload() {
    const [image, setImage] = useState<File | null>(null); 
    const [progress, setProgress] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");

  // Xử lý khi người dùng chọn file
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload ảnh lên firebase storage
  const handleUpload = () => {
    if (!image) return;

    // Tạo tham chiếu đến vị trí lưu file trong firebase storage
    const storageRef = ref(storage, `images/${image.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            // Tính toán tiến trình upload
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
        (error) => {
            console.error('Upload failed:', error);
        },
        () => {
            // Lấy url của ảnh sau khi upload thành công
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setImageUrl(url);
                console.log('Upload successful:', url);
            })
        }
    )
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <h3>Upload Progress: {progress}%</h3>
        {imageUrl && <img src={imageUrl} alt="" style={{ width: "300px" }} />}
      </div>
    </>
  );
}

export default PhotoUpload;
