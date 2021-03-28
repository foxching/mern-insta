import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../redux/actions/postAction";
import M from "materialize-css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const uploadDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "dtvqrqyqr");

    if (title && body) {
      fetch("https://api.cloudinary.com/v1_1/dtvqrqyqr/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err));
    } else {
      M.toast({
        html: "All fields are required",
        classes: "#c62828 red darken-3"
      });
    }
  };

  const handleCreatePost = () => {
    const post = {
      title,
      body,
      pic: url
    };
    dispatch(createPost(post, history));
  };

  useEffect(() => {
    if (url) {
      handleCreatePost();
    }
    // eslint-disable-next-line
  }, [url]);

  return (
    <div
      className="card input-filled"
      style={{
        maxWidth: "500px",
        padding: "20px",
        margin: "10px auto",
        textAlign: "center"
      }}
    >
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="title"
      />
      <input
        type="text"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="body"
      />
      <div className="file-field input-field">
        <div className="btn  blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light blue darken-1"
        type="submit"
        onClick={() => uploadDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;
