import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useActiveUser,
  useSetActiveUser,
} from "../../contexts/ActiveUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UsernameForm = () => {
  // State for managing user input and server-side errors
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  // useHistory hook for managing user navigation history
  const history = useHistory();
  // useParams hook to extract URL parameters
  const { id } = useParams();

  // Get the active user's information
  const activeUser = useActiveUser();
  // Function to update the active user context
  const setActiveUser = useSetActiveUser();

  // useEffect hook to populate form data and redirect unauthorized users
  useEffect(() => {
    if (activeUser?.profile_id?.toString() === id) {
      setUsername(activeUser.username);
    } else {
      history.push("/");
    }
  }, [activeUser, history, id]);

  // Handler to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // API call to update user's username
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      // Update active user context with new username
      setActiveUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      // Return to the previous page after successfully saving
      history.goBack();
    } catch (err) {
      // Handle errors by setting error state
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          {/* Form for changing username */}
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Change Username</Form.Label>
              <Form.Control className={appStyles.PlaceholderFontSize}
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;