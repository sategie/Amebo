import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useActiveUser, useSetActiveUser } from "../contexts/ActiveUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useOutsideClickToggle from "../hooks/useOutsideClickToggle";


// NavBar component
const NavBar = () => {
  // Fetch the active user data and methods to set active user
    const activeUser = useActiveUser();
    const setActiveUser = useSetActiveUser();
    // Use custom hook to handle expanded state and reference for the toggle button
    const {expanded, setExpanded, ref} = useOutsideClickToggle();
 

    // Asynchronous event handler function to handle the logout process
    const handleLogOut = async() => {
        try{
          // Attempt to make a post request to logout endpoint
            await axios.post("dj-rest-auth/logout/");
            // If successful, clear the active user
            setActiveUser(null);
        } catch(err) {
            console.log(err);
        }
    };

    // Links and icons to display when the user is logged in
    const loggedInIcons = (
        <>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/create-post">
        <i className="fa-solid fa-square-plus"></i>Create Post
        </NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/followed-users">
        <i className="fa-solid fa-people-group"></i>Followed Users
        </NavLink>
        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/notifications">
        <i className="fa-solid fa-bell"></i>Notifications
        </NavLink>
        <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
        <i className="fa-solid fa-user-plus"></i>Logout
        </NavLink>
        <NavLink className={styles.NavLink} to={`/profiles/${activeUser?.profile_id}`}>
        <Avatar src={activeUser?.profile_image} text="Profile" height={40} />
        </NavLink>
    </>

    )


    // Links and icons to display when the user is logged out
    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/login">
            <i className="fa-solid fa-right-to-bracket"></i>Login
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
            <i className="fa-solid fa-user-plus"></i>Signup
            </NavLink>
        </>
      );


  // Rendering the NavBar
  return (
    <Navbar expanded = {expanded} className={styles.NavBar} expand="lg" fixed="top">
        <NavLink to="/">
        <Navbar.Brand className={styles.navBrand}>
          <img src={logo} alt="logo" height="100" />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle ref = {ref} onClick = {() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
            <i className="fa-solid fa-house"></i>Home
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts">
            <i className="fa-solid fa-square-rss"></i>Posts
            </NavLink>
            {activeUser ? loggedInIcons : loggedOutIcons}

          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );    
};

export default NavBar;