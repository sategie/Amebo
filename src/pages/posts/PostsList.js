import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import styles from "../../styles/PostsList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostsList() {
  const [posts, setPosts] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get(`/posts/?search=${search}`);
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
    const delaySearch = setTimeout(() => {
        fetchPosts();
      }, 1000);
  
      return () => {
        clearTimeout(delaySearch);
      };
    }, [search]);



  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Form className="mb-3">
          <Form.Group className={styles.SearchBar}>
            <Form.Control
              type="text"
              placeholder="Search posts..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </Form.Group>
        </Form>
        {loading ? (
          <Spinner animation="border" variant="success" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
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