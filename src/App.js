import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
        <NavBar />
        <Container className={styles.Page}>
            <Switch>
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route exact path="/posts" render={() => <h1>Posts</h1>} />
            <Route exact path="/login" render={() => <h1>Login</h1>} />
            <Route exact path="/signup" render={() => <h1>Signup</h1>} />
            <Route render={() => <p>Invalid Page!</p>} />
            </Switch>
        </Container>
    </div>
  );
}

export default App;