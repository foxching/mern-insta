const PostSmall = props => {
  const { pic, title } = props.post;
  return <img className="item" src={pic} alt={title} />;
};

export default PostSmall;
