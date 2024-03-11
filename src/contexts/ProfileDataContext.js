import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { followHelper, unfollowHelper } from "../utils/utils";
import { useActiveUser } from "./ActiveUserContext";

// Create contexts to hold profile data and a function to update it
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks for using the created contexts
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  // State to hold profile information
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    followedUsers: { results: [] },
  });

  // Access active user data using the custom hook from ActiveUserContext
  const activeUser = useActiveUser

  // Handler to handle following a profile
  const handleFollow = async(selectedProfile) => {
    try {
        const {data} = await axiosRes.post("/followers/", {
            followed_user: selectedProfile.id,
        });
        // Update profile data with the new follower information
        setProfileData((prevState) => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) =>
                followHelper(profile, selectedProfile, data.id)
              ),
            },
        
          }));
    

    } catch(err) {
        console.log(err)
    }
  }

  // Handler to handle unfollowing a profile
  const handleUnfollow = async (selectedProfile) => {
    try {
      // Make an API delete request to the backend to remove the follower data
      await axiosRes.delete(`/followers/${selectedProfile.following_id}/`);

      // Update state to show the unfollow action by filtering out the unfollowed profile
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, selectedProfile)
          ),
        },
        followedUsers: { 
          // Update the followedUsers results to exclude the unfollowed profile
          results: prevState.followedUsers.results.filter(
            (profile) => profile.id !== selectedProfile.id
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };


  // Fetch profile data when the component mounts or the active user changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch profiles, ordered by followers count in descending order
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        // Set the fetched profile data as the main profile information in the state
        setProfileData((prevState) => ({
          ...prevState,
          mainProfile: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [activeUser]);

  // Provide the profile data and functions to update it down the children components
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};