import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "../components/Profile/ProfileInfo";
import PostSmall from "../components/Post/PostSmall";
import { getMyPost } from "../redux/actions/postAction";

const Profile = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.post.loading);
  const myPosts = useSelector(state => state.post.myPosts);

  useEffect(() => {
    dispatch(getMyPost());
  }, [dispatch]);

  let postsMarkup =
    !loading && myPosts.length > 0 ? (
      myPosts.map(post => <PostSmall key={post._id} post={post} />)
    ) : (
      <p>Loading...</p>
    );

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <ProfileInfo />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: myPosts.length < 2 ? "flex-start" : "space-around"
        }}
      >
        {postsMarkup}
      </div>
    </div>
  );
};

export default Profile;
