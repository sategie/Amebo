import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/CreateEditPostForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function CreatePostForm() {

  const [errors, setErrors] = useState({});


  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form className={styles.Input}>
  <Row>
    <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
      >
        <Form.Group controlId="formBasicEmail" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter post title" className={styles.PlaceholderFontSize} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter post description" className={styles.PlaceholderFontSize} />
        </Form.Group>
        <Form.Group >
          <Form.File
            id="image-upload"
            label="Upload Image"
            // onChange={handleUpload}
            accept="image/*"
            custom
          />
        </Form.Group>
        <div className="d-md-none">{textFields}</div>
      </Container>
    </Col>
    <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
      <Container className={appStyles.Content}>{textFields}</Container>
    </Col>
  </Row>
</Form>
  );
}

export default CreatePostForm;