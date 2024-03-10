import {useEffect, useRef, useState} from 'react'

// Custom hook for toggling expanded state on outside clicks
const useOutsideClickToggle = () => {
    // State for checking whether the content is expanded
    const [expanded, setExpanded] = useState(false);
    // Reference to the element on which we want to detect the outside clicks
    const ref = useRef(null);
    // Hook to listen for clicks outside the referenced element
    useEffect(() => {
        // Handler to be called on mouse up event
        const handleOutsideClick = (event) => {
            // Check if the click occurred outside the ref element
            if (ref.current && !ref.current.contains(event.target)) {
                // Set expanded state to false if the click is outside
                setExpanded(false)
            }
        }
        // Add event listener to document to listen for mouse up events
        document.addEventListener("mouseup", handleOutsideClick)
        // Cleanup function to remove event listener when component unmounts or when effect re-runs
        return () => {
            document.removeEventListener("mouseup", handleOutsideClick)
        }
    }, [ref]);

  return {expanded, setExpanded, ref}
}

export default useOutsideClickToggle