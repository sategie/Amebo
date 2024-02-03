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
            let userProfiles = [];
            for (let profile of profiles.results) {
                if (profile.following_id != null) {
                    userProfiles.push(profile);
                }
            }

            console.log("filtered profiles: ", userProfiles);
            console.log("previous state:", followedUsers);

            setProfileData(prevState => ({
                ...prevState,
                followedUsers: { results: userProfiles },
            }));
        };

        async function fetchFollowedUsers() {
            try {
                const {data} = await axiosReq.get(`/profiles/`);

                console.log("Profiles:", data.results);

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