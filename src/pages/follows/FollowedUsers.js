import React, { useEffect, useState, useCallback } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from '../profiles/Profile';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import { Spinner } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import { useHistory } from 'react-router-dom';

const FollowedUsers = () => {
    // Access followed users from ProfileData context
    const { followedUsers } = useProfileData();
    // Update function for ProfileData context
    const { setProfileData } = useSetProfileData();
    // State to control the display of the loading spinner
    const [loading, setLoading] = useState(true);
    // Access active user's information
    const activeUser = useActiveUser();
    // Hook to manage browser history for navigation purposes
    const history = useHistory();

    // Function to filter and set profiles who are followed by the active user
    const filterProfiles = useCallback((profiles) => {
        let userProfiles = [];
        // Iterate over all profiles and push only the followed profiles into the empty array
        for (let profile of profiles) {
            if (profile.following_id != null && !userProfiles.some(p => p.id === profile.id)) {
                userProfiles.push(profile);
            }
        }
        console.log("Filtered profiles:", userProfiles);
        // Update context to include only followed profiles
        setProfileData(prevState => ({
            ...prevState,
            followedUsers: { 
                ...prevState.followedUsers, 
                results: [...new Map([...(prevState.followedUsers?.results || []), ...userProfiles].map(profile => [profile.id, profile])).values()] 
            },
        }));
    }, [setProfileData]);

    useEffect(() => {
        // Reset followed Users whenever the activeUser changes, and fetch new data if activeUser is present
        setProfileData(prevState => ({
            ...prevState,
            followedUsers: { ...prevState.followedUsers, results: [] }
        }));

        if (!activeUser) {
            // Redirect to home if there is no active user
            history.push('/');
            return;
        }

        // Flag to manage async operations
        let isMounted = true;

        async function fetchFollowedUsers() {
            // Empty array to store all fetched profiles
            let allProfiles = [];
            // Pagination control
            let nextPage = 1;
            // Total profiles count control
            let count = 1;
            try {
                // Enable spinner
                setLoading(true);
                do {
                    const {data} = await axiosReq.get(`/profiles/?page=${nextPage}`);
                    // Prevent state update if component is unmounted
                    if (!isMounted) return;
                    allProfiles = [...allProfiles, ...data.results];
                    // Update total count control
                    count = data.count;
                    nextPage++;
                } while (allProfiles.length < count); // Continue fetching all profiles until all the pages have been gone through
                if (isMounted) {
                    // Filter followed users from all profiles
                    filterProfiles(allProfiles);
                }
            } catch (err) {
                console.log(err);
            } finally {
                // Disable spinner once data is fetched or if an error occurs
                if (isMounted) setLoading(false);
            }
        }

        // Initiate the fetching of followed users
        fetchFollowedUsers();

        return () => {
            // Set flag to prevent state updates after component is unmounted
            isMounted = false;
        };
    }, [activeUser, history, filterProfiles, setProfileData]);

    return (
        <div className={`my-3 d-flex align-items-center flex-column`}>
            {loading ? (
          <Spinner animation="border" variant="success" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
            ) : followedUsers.results.length ? (
                     followedUsers.results.map(profile => (
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