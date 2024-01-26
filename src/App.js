import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import CreatePostForm from "./pages/posts/CreatePostForm";
import PostPage from "./pages/posts/PostPage";
import PostsList from "./pages/posts/PostsList";
import EditPostForm from "./pages/posts/EditPostForm";
import ProfilePage from "./pages/profiles/ProfilePage";


function App() {



  return (
    <div className={styles.App}>
        <NavBar />
        <Container className={styles.Page}>
            <Switch>
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route exact path="/posts" render={() => <PostsList />} />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/create-post" render={() => <CreatePostForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <EditPostForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route render={() => <p>Invalid Page!</p>} />
            </Switch>
        </Container>
    </div>
  );
}

export default App;