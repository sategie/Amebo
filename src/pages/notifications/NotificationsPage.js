import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import axios from 'axios';
import styles from "../../styles/NotificationsPage.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const NotificationsPage = () => {
  // State for storing notifications
  const [notifications, setNotifications] = useState({results: [], next: null});
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
        setNotifications(response.data);
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
        <InfiniteScroll
  dataLength={notifications.results.length}
  next={() => fetchMoreData(notifications, setNotifications)}
  hasMore={!!notifications.next}
  loader={<Spinner animation="border" variant="success" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>}
  endMessage={
    // Only show the ending message if there are notifications
    notifications.results.length > 0 ? (
      <p style={{ textAlign: "center" }}>
        <b>You have seen all notifications.</b>
      </p>
    ) : null
  }
>
  <ListGroup>
    {notifications.results.length > 0 ? (
      notifications.results.map(notification => (
        <ListGroup.Item key={notification.id} className={styles.unseenNotification}>
          <p className={!notification.seen ? styles.unseenText : ''}>{notification.message}</p>
          <small>Received on: {new Date(notification.created_date).toLocaleString()}</small>
        </ListGroup.Item>
      ))
    ) : (
      <p>No notifications found.</p>
    )}
  </ListGroup>
</InfiniteScroll>
      )}
    </Container>
  );
};

export default NotificationsPage;