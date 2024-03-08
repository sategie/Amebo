import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Post from "./Post";
import { useActiveUser } from "../../contexts/ActiveUserContext";
import CreateCommentForm from "../comments/CreateCommentForm";
import Comment from "../comments/Comment";

// PostPage component which handles the display of a single post and its comments
function PostPage() {
  // Extract post id from URL parameters
    const { id } = useParams();
    // State which holds post data
    const [post, setPost] = useState({ results: [] });

    const activeUser = useActiveUser();
    // Get profile image if it exists
    const profile_image = activeUser?.profile_image;
    const [comments, setComments] = useState({
        results: []
    });

    useEffect(() => {
      // Handler to load post and comments
        const handleMount = async () => {
          try {
            // API request to fetch post and comments data at the same time
            const [{ data: post }, { data: comments }] = await Promise.all([
              axiosReq.get(`/posts/${id}`),
              axiosReq.get(`/comments/?post=${id}`),
            ]);
            // Update state with the fetched data
            setPost({ results: [post] });
            setComments(comments);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);

// Render post and comment data to the browser
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {/* Logic to display the CreateCommentForm component if a user is authenticated */}
        {activeUser ? (
    <CreateCommentForm
    profile_id={activeUser.profile_id}
    profile_image={profile_image}
    post={id}
    setPost={setPost}
    setComments={setComments}
    />
    ) : comments.results.length ? (
    "Comments"
    ) : null}
    {/* Map through comments array to display each comment */}
    {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment key={comment.id}
              {...comment}
              setPost={setPost} 
              setComments={setComments} 
              />
            ))
          ) : activeUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
          
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;