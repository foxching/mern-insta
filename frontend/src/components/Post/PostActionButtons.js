import { useDispatch } from "react-redux";
import { togglelikeUnLikePost } from "../../redux/actions/postAction";

const PostActionButtons = ({ authId, likes, id, isLoading }) => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <i
        className="material-icons"
        style={{
          color: !isLoading && likes.includes(authId) ? "red" : "black",
          cursor: "pointer"
        }}
        onClick={() => dispatch(togglelikeUnLikePost(id))}
      >
        favorite
      </i>
      <i
        className="material-icons"
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        message
      </i>
      <i
        className="material-icons"
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        screen_share
      </i>
    </div>
  );
};

export default PostActionButtons;
