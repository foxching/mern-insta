import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "../../redux/actions/userActions";

const ProfilePhoto = ({ loading, pic, userId, authUserId }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "dtvqrqyqr");
      fetch("https://api.cloudinary.com/v1_1/dtvqrqyqr/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          //redux action here
          dispatch(updateProfilePic(data.url));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [image, dispatch]);

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <img
        className="responsive-img circle"
        style={{ width: "160px", height: "160px" }}
        alt=""
        src={
          !loading
            ? pic
            : "https://res.cloudinary.com/dtvqrqyqr/image/upload/v1616895042/giphy_tacamn.gif"
        }
      />
      {!loading && authUserId === userId && (
        <React.Fragment>
          <input
            type="file"
            id="imageInput"
            hidden
            onChange={e => setImage(e.target.files[0])}
          />
          <button
            style={{ position: "absolute", top: "80%", left: "70%" }}
            className="waves-effect waves-teal btn-flat button"
            onClick={handleEditPicture}
          >
            <i className="tiny material-icons">camera_alt</i>
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProfilePhoto;
