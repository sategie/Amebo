import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostsList() {
  const [posts, setPosts] = useState({ results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get("/posts");
        setPosts((prevState) => ({
          ...prevState,
          results: data.results,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {loading ? (
          <div >
            <Spinner animation="border" variant="success" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : posts.results.length ? (
          posts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setPosts} />
          ))
        ) : (
          <p>No posts are available.</p>
        )}
      </Col>
    </Row>
  );
}

export default PostsList;