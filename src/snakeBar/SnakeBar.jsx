import React, { useContext, useEffect } from "react";
import { SnakeBarContext } from "../context/SnakeBarContext";
import "./SnakeBar.css";

function SnakeBar() {
  const { message, status, snakeBarOpen, setSnakeBarOpen } =
    useContext(SnakeBarContext);

  useEffect(() => {
    if (snakeBarOpen) {
      const timer = setTimeout(() => {
        setSnakeBarOpen(false);
        console.log("snakebaropen", snakeBarOpen);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [snakeBarOpen]);

  const handleClose = () => {
    setSnakeBarOpen(false);
  };

  if (!snakeBarOpen) return null;

  return (
    <div className={`snackbar-container snackbar-${status}`}>
      <div className="snackbar-message">{message}</div>
      <button className="snackbar-close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
}

export default SnakeBar;
