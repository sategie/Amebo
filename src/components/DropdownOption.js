import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/DropdownOption.module.css";


// Custom component for rendering the dots icon used for opening the dropdown menu
const DotsIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
     // Pass ref for direct DOM access
    ref={ref}
    onClick={(e) => {
      // Prevent default action of the event
      e.preventDefault();
      // Handler to handle clicking the dots icon
      onClick(e);
    }}
  />
));

// Dropdown option component which provides edit and delete options
export const DropdownOption = ({ handleEdit, handleDelete }) => {
  return (
    // Dropdown component wrapper for styling purposes
    <Dropdown className="ml-auto" drop="right">
      <Dropdown.Toggle as={DotsIcon} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Component for rendering a profile dropdown menu
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={DotsIcon} />
        <Dropdown.Menu className={styles.DropdownFont}>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> Change Picture
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            Change Username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            Change Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }