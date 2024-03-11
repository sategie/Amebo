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
import UsernameForm from "./pages/profiles/UsernameForm";
import PasswordForm from "./pages/profiles/PasswordForm";
import EditProfileForm from "./pages/profiles/EditProfileForm";
import HomePage from "./pages/home/HomePage";
import FollowedUsers from "./pages/follows/FollowedUsers";
import NotificationsPage from "./pages/notifications/NotificationsPage";


function App() {

  return (
    <div className={styles.App}>
      {/* Nav bar displayed at the top of all pages */}
        <NavBar />
        {/* Main content area with routing handling */}
        <Container className={styles.Page}>
          {/* Switch between routes depending on the current URL */}
            <Switch>
              {/* Route components for different pages */}
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/posts" render={() => <PostsList />} />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/create-post" render={() => <CreatePostForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <EditPostForm />} />
            <Route exact path="/followed-users" render={() => <FollowedUsers />} />
            <Route exact path="/notifications" render={() => <NotificationsPage />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
            <Route exact path="/profiles/:id/edit/password" render={() => <PasswordForm />} />
            <Route exact path="/profiles/:id/edit" render={() => <EditProfileForm />} />
            
            {/* Fallback route for non-existent paths */}
            <Route render={() => <p>Invalid Page!</p>} />
            </Switch>
        </Container>
    </div>
  );
}

export default App;