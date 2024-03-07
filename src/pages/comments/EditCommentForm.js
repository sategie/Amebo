import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CreateEditCommentForm.module.css";

function EditCommentForm(props) {
  // Destructure props to extract needed values
  const { id, post, comment_content, setShowEditForm, setComments } = props;

  // State which holds the form content
  const [formContent, setFormContent] = useState(comment_content);

  // Handler for the form content change
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    try {
      // Attempt to update comment via API call
      await axiosRes.put(`/comments/${id}/`, {
        post,
        comment_content: formContent.trim(),
      });
      // Update comment state after a successful API update
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                comment_content: formContent.trim(),
                updated_date: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // Log error to console if update fails
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!formContent.trim()}
          type="submit"
        >
          Update
        </button>
      </div>
    </Form>
  );
}

export default EditCommentForm;