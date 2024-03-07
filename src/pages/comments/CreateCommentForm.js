import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CreateEditCommentForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

// Function for creating new comment forms
function CreateCommentForm(props) {
  const { post, setPost, setComments, profile_image, profile_id } = props;
  // State to hold the comments
  const [comment_content, setCommentContent] = useState("");

  // Handler for the form content change
  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    // Prevents the default form submission action
    event.preventDefault();
    try {
      // Posts new comment to the API and captures the response
      const { data } = await axiosRes.post("/comments/", {
        comment_content,
        post,
      });
      // Updates the state to show the new comment without reloading the page
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Increments the comment count by 1
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      // Resets the comment input field
      setCommentContent("");
    } catch (err) {
      // Logs an error to the console if the comment fails
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
        {/* Clicking the avatar redirects to the user profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          {/* Text input for the comment content */}
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={comment_content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!comment_content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CreateCommentForm;