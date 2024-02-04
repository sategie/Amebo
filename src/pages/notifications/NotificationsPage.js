import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "../../styles/NotificationsPage.module.css";

const NotificationsPage = () => {
  return (
    <Container className={styles.NotificationMessage}>
      This Page is under construction. Please check back later
      <i className= {`fa-solid fa-screwdriver-wrench ${styles.Icon}`}></i>
    </Container>
  )
}

export default NotificationsPage