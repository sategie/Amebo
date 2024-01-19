import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const ActiveUserContext = createContext();
export const SetActiveUserContext = createContext();

function App() {
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


  return (
    <ActiveUserContext.Provider value={activeUser}>
    <SetActiveUserContext.Provider value={setActiveUser}>
    <div className={styles.App}>
        <NavBar />
        <Container className={styles.Page}>
            <Switch>
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route exact path="/posts" render={() => <h1>Posts</h1>} />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route render={() => <p>Invalid Page!</p>} />
            </Switch>
        </Container>
    </div>
    </SetActiveUserContext.Provider>
    </ActiveUserContext.Provider>
  );
}

export default App;