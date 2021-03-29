import { Link } from "react-router-dom";
const PostComment = ({ comment }) => {
  return (
    <div className="comment">
      <h6 className="comment-info">
        <span style={{ fontWeight: "500" }}>
          <Link to={`/profile/${comment.postedBy.name}`}>
            {comment.postedBy.name}
          </Link>
        </span>{" "}
        {comment.text}
      </h6>
      <i className="material-icons tiny grey-text">delete</i>
    </div>
  );
};

export default PostComment;
