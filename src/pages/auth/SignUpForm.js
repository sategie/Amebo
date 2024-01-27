import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert, } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect("loggedIn")
    const [signUpInfo, setSignUpInfo] = useState({
        username: "",
        password1:"",
        password2:"",
    });
    // Destructuring used
    const {username, password1, password2} = signUpInfo;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpInfo({
            ...signUpInfo,
            // Use Computed Property Names to create a key value pair that can be reused throughout the form
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpInfo);
            history.push("/login");
        } catch(err) {
            // Use optional chaining to handle error display
            setErrors(err.response?.data);
        }
    };



  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Signup</h1>

<Form onSubmit={handleSubmit}>
  <Form.Group controlId="username">
    <Form.Label className="d-none">username</Form.Label>
    <Form.Control className={styles.Input} type="text" placeholder="username" name="username" value={username} onChange={handleChange} />
  </Form.Group>
  {errors.username?.map((message,index) => 
    <Alert variant="warning" key={index} className={styles.Alert}>{message}</Alert>
  )}

  <Form.Group controlId="password1">
    <Form.Label className="d-none">password</Form.Label>
    <Form.Control className={styles.Input} type="password" placeholder="password" name="password1" value={password1} onChange={handleChange} />
  </Form.Group>
  {errors.password1?.map((message,index) => 
    <Alert variant="warning" key={index} className={styles.Alert}>{message}</Alert>
  )}

  <Form.Group controlId="password2">
    <Form.Label className="d-none">confirm password</Form.Label>
    <Form.Control className={styles.Input} type="password" placeholder="confirm password" name="password2" value={password2} onChange={handleChange} />
  </Form.Group>
  {errors.password2?.map((message,index) => 
    <Alert variant="warning" key={index} className={styles.Alert}>{message}</Alert>
  )}
  
  <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
    Signup
  </Button>
  {errors.non_field_errors?.map((message,index) => 
    <Alert variant="warning" key={index} className={styles.Alert}>{message}</Alert>
  )}
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