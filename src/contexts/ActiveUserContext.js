import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

export const useActiveUser = () => useContext(ActiveUserContext);
export const useSetActiveUser = () => useContext(SetActiveUserContext);

export const ActiveUserProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(null);

    const handleMount = async () => {
        try {
          const { data } = await axios.get("dj-rest-auth/user/");
          setActiveUser(data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        handleMount();
      }, []);

      return(
        <ActiveUserContext.Provider value={activeUser}>
        <SetActiveUserContext.Provider value={setActiveUser}>
        {children}
        </SetActiveUserContext.Provider>
        </ActiveUserContext.Provider>
      )
}