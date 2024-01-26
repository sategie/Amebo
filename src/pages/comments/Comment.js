import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropdownOption } from "../../components/DropdownOption";
import { useActiveUser } from "../../contexts/ActiveUserContext";
import styles from "../../styles/Comment.module.css";
import EditCommentForm from "./EditCommentForm";

const Comment = (props) => {
  const { profile_id, profile_image, user, updated_date, comment_content, id, post, setPost, setComments } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const activeUser = useActiveUser();

  const own_comment = activeUser?.username === user;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };


  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{user}</span>
          <span className={styles.Date}>{updated_date}</span>
          {showEditForm ? (
            <EditCommentForm
            id={id}
            profile_id={profile_id}
            post={post}
            comment_content={comment_content}
            profile_image={profile_image}
            setComments={setComments}
            setShowEditForm={setShowEditForm}
              />
          ) : (
            <p>{comment_content}</p>
          )}
        </Media.Body>
        {own_comment && !showEditForm && (
          <DropdownOption
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;