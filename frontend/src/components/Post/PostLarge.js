import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostComment from "./PostComment";
import PostActionButtons from "./PostActionButtons";
import PostCommentForm from "./PostCommentForm";
import DeleteModal from "../../components/Modal/DeleteModal";

const PostLarge = props => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const userId = useSelector(state => state.auth.user._id);
  const { _id, title, body, postedBy, pic, likes, comments } = props.post;

  return (
    <div className="card home-card post-container">
      <div className="post-header">
        <Link to={`/profile/${postedBy.name}`}>
          <div className="post-user">
            <img
              className="responsive-img circle post-image"
              alt={title}
              src={postedBy.pic}
            />
            <h6 className="poster-name">{postedBy.name}</h6>{" "}
          </div>
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
        <PostActionButtons
          likes={likes}
          id={_id}
          isLoading={isLoading}
          userId={userId}
        />
        <h6>{likes.length} likes</h6>
        <h6>{title}</h6>
        <p>{body}</p>
        {comments.map(comment => (
          <PostComment key={comment.id} comment={comment} />
        ))}
        <PostCommentForm id={_id} />
      </div>
      <DeleteModal id={`modal${_id}`} />
    </div>
  );
};
export default PostLarge;
