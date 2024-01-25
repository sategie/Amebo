import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/CreateEditPostForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function CreatePostForm() {
    const [errors, setErrors] = useState({});
    
    const[postInfo, setPostInfo] = useState({
        title:"",
        post_content:"",
        image:"",
    });

    const { title, post_content, image } = postInfo;

    const imageInput = useRef(null)

    const history = useHistory(null)

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("post_content", post_content);
        
        if(imageInput.current && imageInput.current.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        };

        try {
            const {data} = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch(err) {
            console.log(err);
            if (err.response?.status !==401) {
                setErrors(err.response?.data);
            }

        }
    };




    return (
      <Form className={styles.Input} onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter post title" className = {styles.PlaceholderFontSize} name="title" value={title} onChange={handleChange} />
              </Form.Group>
              {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
              <Form.Group controlId="formBasicPassword" >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter post description" className = {styles.PlaceholderFontSize} name="post_content" value={post_content} onChange={handleChange} />
              </Form.Group>
              {errors?.post_content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
              <Form.Group >
                <Form.File
                  id="image-upload"
                  label="Upload Image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            </Container>
          </Col>
          <Col md={5} lg={4} className="p-0 p-md-2 d-none d-md-block">
            <Container
              className={`${appStyles.Content} d-flex justify-content-center align-items-center`}
            >
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.ButtonArea}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>

              <Button className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.ButtonArea}`} type="submit">
                Create
              </Button>
            </Container>
          </Col>
        </Row>
      </Form>
    );
  }

export default CreatePostForm;