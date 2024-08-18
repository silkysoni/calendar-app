import React, { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./EventModal.css";
import { EventContext } from "../context/EventContext";

const EventModal = ({ isVisible, onClose }) => {
  const { selectedEvent } = useContext(EventContext);

  if (!isVisible || !selectedEvent) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
        <h2>{selectedEvent.title}</h2>
        <p>Category: {selectedEvent.category}</p>
        <p>Date: {selectedEvent.date}</p>
      </div>
    </div>
  );
};

export default EventModal;
