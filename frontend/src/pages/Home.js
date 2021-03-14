import { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import Post from "../components/Post/Post"
import { getAllPost } from "../redux/actions/postAction"


const Home = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.post.loading)
  const posts = useSelector(state => state.post.posts);

  useEffect(() => {
    dispatch(getAllPost())
  },[dispatch])


  let postsMarkup = !loading && posts.length > 0 ? (
    posts.map(post => <Post key={post._id} post={post} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div className="home">
     {postsMarkup}
    </div>
  );
};

export default Home;
