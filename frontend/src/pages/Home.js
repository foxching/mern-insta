const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>rechie</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
            alt="img"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>This is a nature</p>
          <input type="text" placeholder="add comment.." />
        </div>
      </div>
    </div>
  );
};

export default Home;
