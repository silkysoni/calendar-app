import React, { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./AddEventForm.css";
import EventModal from "../modal/EventModal";
import { FaEye } from "react-icons/fa";
import { SnakeBarContext } from "../context/SnakeBarContext";

const AddEventForm = () => {
  const {
    addEvent,
    selectedDate,
    setSelectedDate,
    getEventsForDate,
    editEvent,
    deleteEvent,
    events,
    setModalOpen,
    modalOpen,
    setSelectedEvent,
    filterCategory,
  } = useContext(EventContext);

  const { showSnackBar } = useContext(SnakeBarContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [eventsForDate, setEventsForDate] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  const openModal = (event) => {
    setModalOpen(true);
    setSelectedEvent(event);
  };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      showSnackBar("Select a date!", "error");
      return;
    }
    if (!category) {
      showSnackBar("Select a Category!", "error");
      return;
    }
    if (!title.trim()) {
      showSnackBar("Title required!", "error");
      return;
    }
    try {
      if (selectedDate) {
        if (editingEventId) {
          editEvent(editingEventId, title, category);
          showSnackBar("Event updated successfully!", "success");
        } else {
          let obj = {
            id: Date.now(),
            title,
            date: selectedDate,
            category: category,
          };

          addEvent(obj);
          showSnackBar("Event added successfully!", "success");
        }
        fetchEventsForDate();
        setTitle("");
        setEditingEventId(null);
      }
    } catch (error) {
      console.error("Error handling event submission:", error);
      showSnackBar("Error in proccessing event!", "error");
    }
  };

  const handleEdit = (event) => {
    setTitle(event.title);
    setCategory(event.category);
    setEditingEventId(event.id);
    setSelectedDate(event.date);
  };

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    showSnackBar("Event deleted!", "error");
    setEditingEventId(null);
    setTitle("");
    fetchEventsForDate();
  };

  const fetchEventsForDate = () => {
    if (selectedDate) {
      let events = getEventsForDate(selectedDate);

      if (filterCategory !== "All") {
        events = events.filter((event) => event.category === filterCategory);
      }

      setEventsForDate(events);
    } else {
      setEventsForDate([]);
    }
  };

  React.useEffect(() => {
    fetchEventsForDate();
  }, [selectedDate, events, filterCategory]);

  React.useEffect(() => {
    setEditingEventId(null);
    setTitle("");
  }, [selectedDate]);

  return (
    <div>
      <EventModal isVisible={modalOpen} onClose={closeModal}></EventModal>
      {selectedDate ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="event-type-dropdown"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>

            <button
              type="submit"
              disabled={!selectedDate}
              className="addevent-button"
            >
              {editingEventId ? "Update Event" : "Add Event"}
            </button>
          </form>
          {eventsForDate.length > 0 && (
            <>
              <h3>Events on {selectedDate}</h3>
              <ul>
                {eventsForDate.map((event) => (
                  <li key={event.id}>
                    {event.title}
                    <div className="buttons-div">
                      <button onClick={() => handleEdit(event)}>
                        <MdEdit />
                      </button>
                      <button onClick={() => handleDelete(event.id)}>
                        <MdDelete />
                      </button>
                      <div>
                        <button
                          onClick={() => openModal(event)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddEventForm;
