import React, { createContext, useState, useEffect } from "react";

const SnakeBarContext = createContext();

const SnakeBarProvider = ({ children }) => {
  const [snakeBarOpen, setSnakeBarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const showSnackBar = (msg, type) => {
    console.log("msg,status", msg, type);

    setMessage(msg);
    setStatus(type);
    setSnakeBarOpen(true);
    console.log("snakebaropen", snakeBarOpen);
  };

  return (
    <SnakeBarContext.Provider
      value={{
        snakeBarOpen,
        setSnakeBarOpen,
        message,
        setMessage,
        status,
        setStatus,
        showSnackBar,
      }}
    >
      {children}
    </SnakeBarContext.Provider>
  );
};

export { SnakeBarContext, SnakeBarProvider };
