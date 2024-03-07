import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropdownOption } from "../../components/DropdownOption";
import { useActiveUser } from "../../contexts/ActiveUserContext";
import styles from "../../styles/Comment.module.css";
import EditCommentForm from "./EditCommentForm";

// Comment component for displaying individual comments
const Comment = (props) => {
  // Destructuring used to obtain the data for each comment
  const { profile_id, profile_image, user, updated_date, comment_content, id, post, setPost, setComments } = props;

  // State to show the edit comment form
  const [showEditForm, setShowEditForm] = useState(false);

  // Uses the ActiveUserContext to check if the comment belongs to the authenticated user
  const activeUser = useActiveUser();

  // Check if the comment was created by the active user
  const own_comment = activeUser?.username === user;

  // Handler for deleting a comment
  const handleDelete = async () => {
    try {
      // Delete the comment using its ID
      await axiosRes.delete(`/comments/${id}/`);
      // Update the post state to reflect the decremented comment count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      // Update the comments state by filtering out the deleted comment
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
        {/* Link to the user's profile who created the comment */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{user}</span>
          <span className={styles.Date}>{updated_date}</span>
          {/* Conditional rendering to show EditCommentForm or plain text based on state */}
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
        {/* Display edit and delete options if the comment belongs to the active user */}
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