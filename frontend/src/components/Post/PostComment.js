import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/postAction";

const PostComment = ({ authId, comment, postId, postedBy }) => {
  const dispatch = useDispatch();
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
      {postedBy._id === authId || comment.postedBy._id === authId ? (
        <i
          className="material-icons tiny grey-text"
          onClick={() => dispatch(deleteComment(postId, comment._id))}
        >
          delete
        </i>
      ) : null}
    </div>
  );
};

export default PostComment;
