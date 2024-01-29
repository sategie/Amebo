import React from 'react';
import { useActiveUser } from '../../contexts/ActiveUserContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from '../../styles/HomePage.module.css';

const HomePage = () => {
  const activeUser = useActiveUser();

  return (
    <Card style={{ width: 'max-width' }} >
      <Card.Img variant="top" className = {styles.HeroImage} src="https://res.cloudinary.com/dvfxz4as6/image/upload/v1706178746/media/images/wp3819922-the-cranberries-wallpapers_xsbimp.jpg" />
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
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default HomePage;
