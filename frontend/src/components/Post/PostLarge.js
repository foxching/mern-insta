import { useDispatch, useSelector } from "react-redux";
import { togglelikeUnLikePost } from "../../redux/actions/postAction";

const Post = props => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const userId = useSelector(state => state.auth.user._id);
  const { _id, title, body, postedBy, pic, likes } = props.post;

  return (
    <div className="card home-card">
      <h5>{postedBy.name}</h5>
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
        <input type="text" placeholder="add comment.." />
      </div>
    </div>
  );
};
export default Post;
