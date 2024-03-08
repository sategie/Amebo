import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useActiveUser } from "../../contexts/ActiveUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

// Component for handling password change feature
const PasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const activeUser = useActiveUser();

  // State for user data and errors
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  // Handle input field changes and update state
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Check if user is authorized for the password change
  useEffect(() => {
    if (activeUser?.profile_id?.toString() !== id) {
      // redirect user to home page if not own profile
      history.push("/");
    }
  }, [activeUser, history, id]);

  // Handle password change form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to post new passwords to the API backend
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control className={appStyles.PlaceholderFontSize}
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control className={appStyles.PlaceholderFontSize}
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
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
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default PasswordForm;