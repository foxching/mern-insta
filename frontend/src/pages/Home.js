import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostLarge from "../components/Post/PostLarge";
import { getAllPost } from "../redux/actions/postAction";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.post.loading);
  const posts = useSelector(state => state.post.allPosts);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  let postsMarkup =
    !loading && posts.length > 0 ? (
      posts.map(post => <PostLarge key={post._id} post={post} />)
    ) : (
      <p>Loading...</p>
    );

  return <div className="home">{postsMarkup}</div>;
};

export default Home;
