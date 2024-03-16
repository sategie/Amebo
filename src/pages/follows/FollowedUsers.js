import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from '../profiles/Profile';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import { Spinner } from 'react-bootstrap';
import appStyles from '../../App.module.css';

// FollowedUsers component to display profiles that the active user follows
const FollowedUsers = () => {
    // State to manage the list of followed users
    const { followedUsers } = useProfileData();
    // Update profile data using setState
    const { setProfileData } = useSetProfileData();
    // State to track the loading process
    const [loading, setLoading] = useState(true);
    const activeUser = useActiveUser();

    useEffect(() => {
        // Filter profiles based on following status
        const filterProfiles = (profiles) => {
            let userProfiles = [];
            // Loop through each profile
            for (let profile of profiles.results) {
                // Check if the active user is following the profile
                if (profile.following_id != null) {
                    userProfiles.push(profile);
                }
            }
            // Update the context state with the filtered followed users
            setProfileData(prevState => ({
                ...prevState,
                followedUsers: { results: userProfiles },
            }));
        };
        
        // Fetch the list of profiles the active user is following
        async function fetchFollowedUsers() {
            try {
                // API Request to fetch profiles
                setLoading(true);
                const {data} = await axiosReq.get(`/profiles/`);
                // Filter the received profiles to get the profiles being followed
                filterProfiles(data);
            } catch (err) {
                console.log(err);
            } finally {
                // Set loading state to false
                setLoading(false);
            }
        }

        fetchFollowedUsers();
    }, [activeUser, setProfileData]);

    // Render followed users to the browser
    return (
      <div className={`my-3 d-flex align-items-center flex-column`}>
          {loading ? (
        <Spinner animation="border" variant="success" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
          ) : followedUsers?.results?.length ? (
                   followedUsers.results.map(profile => (
                    // Render each followed user's profile using the Profile component
                      <Profile key={profile.id} profile={profile} />
                  ))
              ) : (
                  <div className={`${appStyles.Content}`}>
                      <p>No users followed.</p>
                  </div>
              )}
      </div>
  );
}

export default FollowedUsers;