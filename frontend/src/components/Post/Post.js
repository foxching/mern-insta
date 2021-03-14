
const Post = (props) => {
    const { title,body,postedBy, pic} = props.post
    return (
        <div className="card home-card">
        <h5>{postedBy.name}</h5>
        <div className="card-image">
          <img
            src={pic}
            alt={title}
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>{title}</h6>
          <p>{body}</p>
          <input type="text" placeholder="add comment.." />
        </div>
      </div>
   
    )
}
export default Post