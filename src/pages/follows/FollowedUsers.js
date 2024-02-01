import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from '../profiles/Profile';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import appStyles from '../../App.module.css'; // Import styles

const FollowedUsers = () => {
    const { followedUsers } = useProfileData();
    const { setProfileData } = useSetProfileData();
    const [hasLoaded, setHasLoaded] = useState(false);

    const activeUser = useActiveUser();

    useEffect(() => {
        const filterProfiles = (profiles) => {
            let userProfiles = profiles.results.filter(profile => profile.following_id != null);
            setProfileData(prevState => ({
                ...prevState,
                followedUsers: { results: userProfiles },
            }));
        };
    
        async function fetchFollowedUsers() {
            try {
                const {data} = await axiosReq.get(`/profiles/`);
                filterProfiles(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
    
        setHasLoaded(false);
        fetchFollowedUsers();
    }, [activeUser, setProfileData]);

    return (
      <div className={`my-3 d-flex align-items-center ${"flex-column"}`}>
          {hasLoaded ? (
              followedUsers?.results?.length ? (
                   followedUsers.results.map(profile => (
                      <Profile key={profile.id} profile={profile} />
                  ))
              ) : (
                  // Enclose the text in a styled div
                  <div className={`${appStyles.Content}`}>
                      <p>No users followed.</p>
                  </div>
              )
          ) : (
              // Enclose the text in a styled div
              <div className={`${appStyles.Content}`}>
                  <p>Loading...</p>
              </div>
          )}
      </div>
  );
}

export default FollowedUsers;
