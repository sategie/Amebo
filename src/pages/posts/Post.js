import React from 'react'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import styles from "../../styles/Post.module.css";

const Post = (props) => {
    const {
        id,
        own_post,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        follower_count,
        title,
        post_content,
        image,
        created_date,
        updated_date,
        user,
        postPage,
    
    } = props;

    const activeUser = useActiveUser();

    const is_own_post = activeUser?.username===own_post;


  return (
    <Card className={styles.Post}>
        <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {user}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_date}</span>
            {is_own_post && postPage && "..."}
          </div>
        </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {post_content && <Card.Text>{post_content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_own_post ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Sorry, you cannot like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : activeUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>



    </Card>
  )
}

export default Post