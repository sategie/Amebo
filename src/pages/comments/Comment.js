import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, user, updated_date, comment_content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{user}</span>
          <span className={styles.Date}>{updated_date}</span>
          <p>{comment_content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;