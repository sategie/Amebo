import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import axios from 'axios';
import styles from "../../styles/NotificationsPage.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NotificationsPage = () => {
  // State for storing notifications
  const [notifications, setNotifications] = useState([]);
  // State for storing possible errors
  const [error, setError] = useState('');
  // State for controlling the loading state
  const [loading, setLoading] = useState(true);
  const activeUser = useActiveUser();
  const history = useHistory()

  useEffect(() => {
    if (!activeUser) {
      // Redirect to home page if there's no active user
      history.push('/');
      return;
    }
    const fetchNotifications = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchNotifications();
    // Add activeUser and as a dependency to re-run useEffect when activeUser changes
  }, [activeUser, history]);

  // Render notifications to the browser
  return (
    <Container className={styles.notificationsContainer}>
      <h2>Notifications</h2>
      {/* Display any error messages */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {/* Add loading spinner */}
      {loading ? (
        <Spinner animation="border" variant="success" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ListGroup>
          {/* Check if there are notifications to be displayed */}
          {notifications.length > 0 ? notifications.map(notification => (
            <ListGroup.Item key={notification.id} className={styles.unseenNotification}>
              <p className={!notification.seen ? styles.unseenText : ''}>{notification.message}</p>
              {/* Format and display the notification creation date */}
              <small>Received on: {new Date(notification.created_date).toLocaleString()}</small>
            </ListGroup.Item>
          )) : <p>No notifications found.</p>}
        </ListGroup>
      )}
    </Container>
  );
};

export default NotificationsPage;