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
    
    const[postInfo, setPostInfo] = useState({
        title:"",
        description:"",
        image:"",
    });

    const { title, description, image } = postInfo;

    const handleChange = (event) => {
        setPostInfo({
            ...postInfo,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostInfo({
                ...postInfo,
                image: URL.createObjectURL(event.target.files[0]),
            });
        };
    };




    return (
      <Form className={styles.Input}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter post title" className = {styles.PlaceholderFontSize} name="title" value={title} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter post description" className = {styles.PlaceholderFontSize} name="description" value={description} onChange={handleChange} />
              </Form.Group>
              <Form.Group >
                <Form.File
                  id="image-upload"
                  label="Upload Image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <div className="text-center d-md-none">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  onClick={() => {}}
                >
                  Cancel
                </Button>
                <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                  Create
                </Button>
              </div>
            </Container>
          </Col>
          <Col md={5} lg={4} className="p-0 p-md-2 d-none d-md-block">
            <Container
              className={`${appStyles.Content} d-flex justify-content-center align-items-center`}
            >
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.LargeButton}`}
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.LargeButton}`} type="submit">
                Create
              </Button>
            </Container>
          </Col>
        </Row>
      </Form>
    );
  }

export default CreatePostForm;