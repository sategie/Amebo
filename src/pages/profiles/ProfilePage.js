import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Button, Image } from "react-bootstrap";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import btnStyles from "../../styles/Button.module.css";
import { useActiveUser } from "../../contexts/ActiveUserContext";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { ProfileEditDropdown } from "../../components/DropdownOption";

function ProfilePage() {
  // State to manage loading status
  const [hasLoaded, setHasLoaded] = useState(false);
  // Get the active user's information
  const activeUser = useActiveUser();
  // Extract profile ID from URL
  const {id} = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  // Get data for profile page from context
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  // Check if the profile belongs to the active user
  const own_profile = activeUser?.username === profile?.user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API request to get profile data based on id
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        // Update profile data in context
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  // Rendering logic to display edit dropdown for own profile if defined conditions are met
  const mainProfile = (
    <>
    {profile?.own_profile && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.user}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2 mx-5">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
            {own_profile ? (
              <Link to={`/followed-users`}>
                <div>{profile?.following_count}</div>
                <div>following</div>
              </Link>
            ) : (
              <div className={styles.NoClick}>
                <div>{profile?.following_count}</div>
                <div>following</div>
              </div>
            )}
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {/* Follow/unfollow button for profiles of other users */}
          {activeUser &&
            !own_profile &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline} `}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Container className={appStyles.Content}>
          {/* Conditionally render profile data or loading spinner */}
          {hasLoaded ? (
            <>
              {mainProfile}
            </>
          ) : (
            <Spinner animation="border" variant="success" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      </Col>
    </Row>
  );
}

export default ProfilePage;