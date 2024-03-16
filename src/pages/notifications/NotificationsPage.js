import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import styles from "../../styles/NotificationsPage.module.css";

const NotificationsPage = () => {
  // State for storing notifications
  const [notifications, setNotifications] = useState([]);
  // State for storing possible errors
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications from the backend server
        const response = await axios.get('/notifications');
        // Update the notifications state with the fetched data
        setNotifications(response.data.results);
        // Clear error state if no error is found
        setError('');
      } catch (error) {
        // In case of error, log error message to the console
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications. Please try again later.');
      }
    };
    fetchNotifications();
  }, []);

  // Render notifications to the browser
  return (
    <Container className={styles.notificationsContainer}>
      <h2>Notifications</h2>
      {/* Display any error messages */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <ListGroup>
        {/* Check if there are notifications to be displayed */}
        {notifications.length > 0 ? notifications.map(notification => (
          <ListGroup.Item key={notification.id} className={styles.unseenNotification}>
            {/* Displaying the notification message */}
            <p className={!notification.seen ? styles.unseenText : ''}>{notification.message}</p>
            {/* Format and display the notification creation date */}
            <small>Received on: {new Date(notification.created_date).toLocaleString()}</small>
          </ListGroup.Item>
        )) : <p>No notifications found.</p>}
      </ListGroup>
    </Container>
  );
};

export default NotificationsPage;