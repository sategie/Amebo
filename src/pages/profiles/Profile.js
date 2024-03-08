import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useActiveUser } from "../../contexts/ActiveUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  // Destructure props to get profile data and image size
  const { profile, imageSize = 55 } = props;
  // Destructure profile data for easier access
  const { id, following_id, image, user } = profile;

  // Get the active user's information
  const activeUser = useActiveUser();
  // Determine if the current profile is the user's own profile
  const own_profile = activeUser?.username === user;

  // Context hook functions to manage follow and unfollow actions
  const { handleFollow, handleUnfollow } = useSetProfileData();


  return (
    <div
      className={`my-3 d-flex align-items-center ${"flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{user}</strong>
      </div>
      <div className={`text-right ${"ml-auto"}`}>
        {/* Check if an active user exists and if it is not the active user's profile */}
        {activeUser &&
          !own_profile &&
          (following_id ? (
            // If following the user, display the unfollow button
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            // If not following the user, display the follow button
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;