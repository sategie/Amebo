import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Custom hook to handle redirection based on logged in status of the user
export const useRedirect = (userAuthStatus) => {
  // useHistory hook to navigate to different routes
  const history = useHistory();

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Async function to handle component mount logic
    const handleMount = async () => {
      try {
        // Attempt to refresh the authentication token
        await axios.post("/dj-rest-auth/token/refresh/");
        // Redirect to homepage if user is logged in
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // Catch token refresh failures, redirect to homepage if user is logged out
        
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    // Call the handleMount function when the component mounts
    handleMount();
  }, [history, userAuthStatus]);
};