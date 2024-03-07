import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from '../profiles/Profile';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import appStyles from '../../App.module.css';

// FollowedUsers component to display profiles that the active user follows
const FollowedUsers = () => {
    // State to manage the list of followed users
    const { followedUsers } = useProfileData();
    // Update profile data using setState
    const { setProfileData } = useSetProfileData();
    // State to track the loading process
    const [hasLoaded, setHasLoaded] = useState(false);

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
                const {data} = await axiosReq.get(`/profiles/`);

                // Filter the received profiles to get the profiles being followed
                filterProfiles(data);
                setHasLoaded(true);
            } catch (err) {
                // Log errors if the request fails
                console.log(err);
            }
        }

        // Initialize fetching process and reset loading state
        setHasLoaded(false);
        fetchFollowedUsers();
    }, [activeUser, setProfileData]);

    return (
      <div className={`my-3 d-flex align-items-center ${"flex-column"}`}>
          {hasLoaded ? (
              followedUsers?.results?.length ? (
                   followedUsers.results.map(profile => (
                    // Render each followed user's profile using the Profile component
                      <Profile key={profile.id} profile={profile} />
                  ))
              ) : (
                // Display message if the active user does not follow anyone
                  <div className={`${appStyles.Content}`}>
                      <p>No users followed.</p>
                  </div>
              )
          ) : (
              <div className={`${appStyles.Content}`}>
                  <p>Loading...</p>
              </div>
          )}
      </div>
  );
}

export default FollowedUsers;