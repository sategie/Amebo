import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Signup</h1>

<Form>
  <Form.Group controlId="username">
    <Form.Label className="d-none">username</Form.Label>
    <Form.Control className={styles.Input} type="text" placeholder="username" name="username" />
  </Form.Group>

  <Form.Group controlId="password1">
    <Form.Label className="d-none">password</Form.Label>
    <Form.Control className={styles.Input} type="password" placeholder="password" name="password1" />
  </Form.Group>

  <Form.Group controlId="password2">
    <Form.Label className="d-none">confirm password</Form.Label>
    <Form.Control className={styles.Input} type="password" placeholder="confirm password" name="password2" />
  </Form.Group>
  
  <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
    Signup
  </Button>
</Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already have an account? <span>Login</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dvfxz4as6/image/upload/v1705523404/nature_gxbcdr.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;