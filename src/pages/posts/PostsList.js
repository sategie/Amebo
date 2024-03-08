import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import styles from "../../styles/PostsList.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

// PostsList component which handles the display of all posts
function PostsList() {
  // State to hold posts, control loading state, and search inputs
  const [posts, setPosts] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetches posts from the API backend based on the current search term
    const fetchPosts = async () => {
      try {
        // Show loading sign while fetching posts
        setLoading(true);
        const { data } = await axiosReq.get(`/posts/?search=${search}`);
        // Update state with the data from the fetched posts
        setPosts(data);
        ;
      } catch (err) {
        console.log(err);
      } finally {
        // Hide loading sign once the data is fetched
        setLoading(false);
      }
    };
    // Delay the execution of fetchPosts to limit API calls while entering search input
    const delaySearch = setTimeout(() => {
        fetchPosts();
      }, 1000);
  
      // Cleanup function to cancel the delay when the component unmounts
      return () => {
        clearTimeout(delaySearch);
      };
    }, [search]);

    // Render posts in the browser
    return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={12}>
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
            ) : (
              <>
              {/* // Render posts or show a message if no posts are available */}
                {posts.results.length ? (
                  <InfiniteScroll
                    children={posts.results.map((post) => (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ))}
                    dataLength={posts.results.length}
                    loader={<Spinner animation="border" variant="success" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>}
                    hasMore={!!posts.next}
                    next={() => fetchMoreData(posts, setPosts)}
                  />
                  
                ) : (
                  <p>No posts are available.</p>
                )}
              </>
            )}
          </Col>
        </Row>
      );
      
                }
export default PostsList;