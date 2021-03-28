import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../redux/actions/userActions";
import ProfilePhoto from "./ProfilePhoto";

const ProfileInfo = ({
  name,
  pic,
  userId,
  authUserId,
  loading,
  followers,
  following,
  userPosts
}) => {
  const dispatch = useDispatch();

  //get the liked scream
  let likedPost = () => {
    if (followers && followers.find(followerId => followerId === authUserId))
      return true;
    else return false;
  };

  //like button component
  const likeButton =
    authUserId === userId ? (
      <button
        style={{ marginTop: "10px", marginLeft: "15px" }}
        className="btn waves-effect waves-light #efebe9 brown darken-5 btn-small"
      >
        Edit
      </button>
    ) : likedPost() ? (
      <button
        style={{ marginTop: "10px", marginLeft: "15px" }}
        className="btn waves-effect waves-light  red darken-1 btn-small"
        onClick={() => dispatch(unFollowUser(userId))}
      >
        UnFollow
      </button>
    ) : (
      <button
        style={{ marginTop: "10px", marginLeft: "15px" }}
        className="btn waves-effect waves-light #64b5f6 blue darken-1 btn-small"
        onClick={() => dispatch(followUser(userId))}
      >
        Follow
      </button>
    );

  return (
    <div
      style={{
        margin: "18px 0px",
        borderBottom: "1px solid grey"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <ProfilePhoto pic={pic} loading={loading} />
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            {loading ? (
              "Loading...."
            ) : (
              <React.Fragment>
                <h4>{name}</h4>
                {likeButton}
              </React.Fragment>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%"
            }}
          >
            <h6>{userPosts && userPosts.length} posts</h6>
            <h6>{followers && followers.length} followers</h6>
            <h6>{following && following.length} following</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
