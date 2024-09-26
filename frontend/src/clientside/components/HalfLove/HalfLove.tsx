import MainLayout from "../MainLayout/MainLayout";
import "./HalfLove.css";

function HalfLove() {

    const handleLike = () => {
        console.log("Like");
    }

    const handleSkip = () => {
        console.log("Skip");
    }

  return (
    <>
      <MainLayout>
        <div className="half_love-container">
          <div className="submenu">
            <div className="submenu-item submenu-hot">Hot</div>
            <div className="submenu-item submenu-online">Online</div>
            <div className="submenu-item submenu-search">Tìm kiếm</div>
          </div>

          <div className="wrapper-half_love-card">
            <div className="half_love-card">
                <div className="half_love-card-display">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blackpink_Ros%C3%A9_Rimowa_1.jpg/330px-Blackpink_Ros%C3%A9_Rimowa_1.jpg"} />
                </div>
                <div className="half_love-card-wrapper_button">
                    <button className="half_love-card-button btn-skip" onClick={handleSkip}> <i className="fa-solid fa-xmark me-1"></i></button>
                    <button className="half_love-card-button btn-like" onClick={handleLike}><i className="fa-solid fa-heart me-1"></i></button>
                </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default HalfLove;
