import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "../components/Profile/ProfileInfo";
import PostSmall from "../components/Post/PostSmall";
import { getUserProfile } from "../redux/actions/userActions";
import { useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loading = useSelector(state => state.user.isLoading);
  const userPosts = useSelector(state => state.user.userPosts);
  const authUser = useSelector(state => state.auth.user);
  const user = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [dispatch]);

  let postsMarkup =
    !loading && userPosts.length > 0 ? (
      userPosts.map(post => <PostSmall key={post._id} post={post} />)
    ) : (
      <p>Loading...</p>
    );

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <ProfileInfo
        loading={loading}
        authUserId={authUser && authUser._id}
        userId={user && user._id}
        name={user && user.name}
        pic={user && user.pic}
        followers={user && user.followers}
        following={user && user.following}
        userPosts={userPosts}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: userPosts.length < 2 ? "flex-start" : "space-around"
        }}
      >
        {postsMarkup}
      </div>
    </div>
  );
};

export default Profile;
