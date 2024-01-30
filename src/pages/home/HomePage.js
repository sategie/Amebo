import React from 'react';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from '../../styles/HomePage.module.css';
import GreenParrot from "../../assets/green-parrot.jpg";

const HomePage = () => {
  const activeUser = useActiveUser();

  return (
    <Card style={{ width: 'max-width' }} >
      <Card.Img variant="top" className = {styles.HeroImage} src= {GreenParrot} />
      <Card.Body>
        {activeUser ? (
          <>
        <Card.Body>
            <Card.Title className = {styles.HomeWelcome} >Welcome {activeUser.username}</Card.Title>
            <Card.Text>
              You now have the following privileges:
            </Card.Text>
        </Card.Body>
            <ListGroup  className='list-group-flush'>
              <ListGroupItem className = {styles.HomeBorder}></ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Create your own posts</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Comment on and like existing posts</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Follow other users</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}></ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Card.Text>
              Simply click on the relevant items in the nav bar above to get started
            </Card.Text>
            </Card.Body>
            
          </>
        ) : (
          <>
        <Card.Body>
            <Card.Title className = {styles.HomeWelcome} >Welcome to the Amebo App</Card.Title>
            <Card.Text>
              Please use the Signup button above to register.
            </Card.Text>
            <Card.Text>
              As a registered user, you would be able to do the following:
            </Card.Text>
        </Card.Body>
            <ListGroup  className='list-group-flush'>
              <ListGroupItem className = {styles.HomeBorder}></ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Create your own posts</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Comment on and like existing posts</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}>Follow other users</ListGroupItem>
              <ListGroupItem className = {styles.HomeBorder}></ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Card.Text>
              If you are already registered, then please use the Login button above to access your account.
            </Card.Text>
        </Card.Body>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default HomePage;
