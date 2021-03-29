import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/postAction";

const PostCommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmitComment = e => {
    e.preventDefault();
    dispatch(createComment(comment, id));
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmitComment}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <input
        type="text"
        placeholder="add comment.."
        name="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        type="submit"
        className={`${
          comment === "" ? "disabled btn-flat blue-text" : "btn-flat blue-text"
        }`}
        style={{ fontSize: "12px" }}
      >
        Post
      </button>
    </form>
  );
};

export default PostCommentForm;
