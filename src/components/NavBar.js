import React, {useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { ActiveUserContext } from "../App";

const NavBar = () => {
    const activeUser = useContext(ActiveUserContext);
    const loggedInIcons = <>{activeUser?.username}</>;


    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/login">
            <i class="fa-solid fa-right-to-bracket"></i>Login
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
            <i class="fa-solid fa-user-plus"></i>Signup
            </NavLink>
        </>
      );



  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
        <NavLink to="/">
        <Navbar.Brand className={styles.navBrand}>
          <img src={logo} alt="logo" height="100" />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
            <i class="fa-solid fa-house"></i>Home
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