import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios"
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

// Contexts for active user state and its setter function
export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

// Custom hook to access the active user context value
export const useActiveUser = () => useContext(ActiveUserContext);
// Custom hook to access the setActiveUser function from context
export const useSetActiveUser = () => useContext(SetActiveUserContext);

// Cmponent to wrap around parts of the app that need access to the contexts
export const ActiveUserProvider = ({children}) => {
  // State for holding the current active user data
    const [activeUser, setActiveUser] = useState(null);
    // Hook for navigation
    const history = useHistory();

    // Handler to handle initial component mount logic
    const handleMount = async () => {
        try {
          // API request to get current user data from backend
          const { data } = await axios.get("dj-rest-auth/user/");
          // Set the obtained user data as the active user
          setActiveUser(data);
        } catch (err) {
          console.log(err);
        }
      };

      // useEffect runs once on component mount to fetch active user data
      useEffect(() => {
        handleMount();
      }, []);

      // useMemo hook to setup Axios interceptors once upon initial render.
      useMemo(() => {
        // Request interceptor to attempt token refresh before each request.
        axiosReq.interceptors.request.use(
          async (config) => {
            try {
              // Before each request, try to refresh the auth token
              await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
              // If token refresh fails, assume the user is logged out and direct them to login
              setActiveUser((prevActiveUser) => {
                if (prevActiveUser) {
                  history.push("/login");
                }
                return null;
              });
              return config;
            }
            return config;
          },
          (err) => {
            // Return rejected promises if an error occurs, to ensure the app runs smoothly
            return Promise.reject(err);
          }
        );
    
        // Interceptor for incoming responses
        axiosRes.interceptors.response.use(
          (response) => response,
          async (err) => {
            if (err.response?.status === 401) {
              // Refresh token if a response returns a 401 Unauthorized status
              try {
                await axios.post("/dj-rest-auth/token/refresh/");
              } catch (err) {
                // On failure, clear the active user and redirect to login
                setActiveUser((prevActiveUser) => {
                  if (prevActiveUser) {
                    history.push("/login");
                  }
                  return null;
                });
              }
              // Retry the failed original request
              return axios(err.config);
            }
            return Promise.reject(err);
          }
        );
      }, [history]);

      // Render logic which provides ActiveUserContext and SetActiveUserContext to children components.
      return(
        <ActiveUserContext.Provider value={activeUser}>
        <SetActiveUserContext.Provider value={setActiveUser}>
        {children}
        </SetActiveUserContext.Provider>
        </ActiveUserContext.Provider>
      )
}