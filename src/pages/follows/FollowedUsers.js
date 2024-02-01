import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from '../profiles/Profile';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { useActiveUser } from '../../contexts/ActiveUserContext';

const FollowedUsers = () => {
    const { followedUsers } = useProfileData();
    const { setProfileData } = useSetProfileData();
    const [hasLoaded, setHasLoaded] = useState(false);

    const activeUser = useActiveUser();


    useEffect(() => {
        // Define the function inside useEffect so it's created with the fresh state/props on every render
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
        <div>
            {hasLoaded ? (
                followedUsers?.results?.length ? (
                     followedUsers.results.map(profile => (
                        <Profile key={profile.id} profile={profile} />
                    ))
                ) : (
                    <p>No users followed.</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default FollowedUsers;
