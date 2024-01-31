import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import Profile from '../profiles/Profile';

const FollowedUsers = () => {
    const [usersFollowed, setUsersFollowed] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    const activeUser = useActiveUser();

    const filterProfiles = (profiles) => {
        let userProfiles = []
        for (let profile of profiles.results) {
            if (profile.following_id != null) {
                userProfiles.push(profile)
            }
        }
        setUsersFollowed({ results: userProfiles})
    }

    useEffect( () => {
        const fetchUsersFollowed = async() => {
            try {
                const {data} = await axiosReq.get(`/profiles/`);
                filterProfiles(data)
                console.log(data)
                setHasLoaded(true);

            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchUsersFollowed();
          }, 1000);

          return () => {
            clearTimeout(timer);
    
    }
}, [activeUser] )

console.log(usersFollowed)



return (
    <div>
        {hasLoaded ? (
            usersFollowed?.results?.length ? (
                 usersFollowed.results.map(profile => (
                    <Profile key={profile.id} profile={profile} />
                ))
            ) : (
                <p>No users followed.</p>
            )
        ) : (
            <p>Loading...</p>
        )}
    </div>
)
}


export default FollowedUsers