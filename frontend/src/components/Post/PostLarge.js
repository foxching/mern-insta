import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/Modal/DeleteModal";
import {
  togglelikeUnLikePost,
  createComment
} from "../../redux/actions/postAction";

const Post = props => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const userId = useSelector(state => state.auth.user._id);
  const [comment, setComment] = useState("");
  const { _id, title, body, postedBy, pic, likes, comments } = props.post;

  const handleSubmitComment = e => {
    e.preventDefault();
    dispatch(createComment(comment, _id));
    setComment("");
  };

  return (
    <div className="card home-card">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginTop: 0
        }}
      >
        <Link to={`/profile/${postedBy.name}`}>
          <h5 style={{ margin: "0 0 10px 0" }}>{postedBy.name}</h5>{" "}
        </Link>
        {postedBy._id === userId && (
          <button
            className="waves-effect waves-light btn-flat modal-trigger"
            data-target={`modal${_id}`}
          >
            <i className="material-icons ">delete</i>
          </button>
        )}
      </div>
      <div className="card-image">
        <img src={pic} alt={title} />
      </div>
      <div className="card-content">
        <i
          className="material-icons"
          style={{
            color: !isLoading && likes.includes(userId) ? "red" : "black",
            cursor: "pointer"
          }}
          onClick={() => dispatch(togglelikeUnLikePost(_id))}
        >
          favorite
        </i>
        <i className="material-icons">message</i>
        <i className="material-icons">screen_share</i>
        <h6>{likes.length} likes</h6>
        <h6>{title}</h6>
        <p>{body}</p>
        {comments.map(comment => (
          <h6 key={comment._id}>
            <span style={{ fontWeight: "500" }}>
              <Link to={`/profile/${comment.postedBy.name}`}>
                {comment.postedBy.name}
              </Link>
            </span>{" "}
            {comment.text}
          </h6>
        ))}
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
              comment === ""
                ? "disabled btn-flat blue-text"
                : "btn-flat blue-text"
            }`}
            style={{ fontSize: "12px" }}
          >
            Post
          </button>
        </form>
      </div>
      <DeleteModal id={`modal${_id}`} />
    </div>
  );
};
export default Post;
