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

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const activeUser = useActiveUser();
    const profile_image = activeUser?.profile_image;
    const [comments, setComments] = useState({
        results: []
    });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: post }] = await Promise.all([
              axiosReq.get(`/posts/${id}`),
            ]);
            setPost({ results: [post] });
            console.log(post);
          } catch (err) {
            console.log(err);
          }
        };
        
        handleMount();
      }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
        {activeUser ? (
    <CreateCommentForm
    profile_id={activeUser.profile_id}
    profileImage={profile_image}
    post={id}
    setPost={setPost}
    setComments={setComments}
    />
    ) : comments.results.length ? (
    "Comments"
    ) : null}
          
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;