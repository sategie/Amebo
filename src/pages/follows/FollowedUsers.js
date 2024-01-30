import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import Profile from '../profiles/Profile';

const FollowedUsers = () => {
    const [usersFollowed, setUsersFollowed] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);

    const activeUser = useActiveUser();

    useEffect( () => {
        const fetchUsersFollowed = async() => {
            try {
                const {data} = await axiosReq.get(`/followers/`);
                console.log(data)
                setUsersFollowed(data);
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



return (
    <div>
        {hasLoaded ? (
            usersFollowed?.length ? (
                usersFollowed.map(user => (
                    <Profile key={user.following_id} profile={user} />
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