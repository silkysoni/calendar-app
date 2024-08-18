import React, { createContext, useState, useEffect } from "react";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  const fetchEvents = async () => {
    try {
      let existingData = JSON.parse(localStorage.getItem("events"));

      if (!existingData) {
        let data = [
          {
            id: 1692172837482,
            title: "Meeting with Team",
            date: "20/08/2024",
            category: "Work",
          },
          {
            id: 1692172837483,
            title: "Project Deadline",
            date: "21/08/2024",
            category: "Work",
          },
          {
            id: 1692172837484,
            title: "Call Friend",
            date: "22/08/2024",
            category: "Personal",
          },
          {
            id: 1692172837485,
            title: "Lunch with Kids",
            date: "23/08/2024",
            category: "Personal",
          },
          {
            id: 1692172837486,
            title: "Team Building Activity",
            date: "24/08/2024",
            category: "Work",
          },
          {
            id: 1692172837487,
            title: "Clean House",
            date: "25/08/2024",
            category: "Personal",
          },
        ];
        localStorage.setItem("events", JSON.stringify(data));
        let updatedData = JSON.parse(localStorage.getItem("events"));
        setEvents(updatedData);
      } else {
        setEvents(existingData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      let existingData = JSON.parse(localStorage.getItem("events"));

      existingData.push(newEvent);
      localStorage.setItem("events", JSON.stringify(existingData));

      let updatedData = JSON.parse(localStorage.getItem("events"));

      setEvents(updatedData);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const editEvent = async (id, updatedEvent, category) => {
    try {
      let existingData = JSON.parse(localStorage.getItem("events")) || [];
      existingData = existingData.map((data) => {
        if (data.id === id) {
          return { ...data, title: updatedEvent, category: category };
        }
        return data;
      });
      setEvents(existingData);
      localStorage.setItem("events", JSON.stringify(existingData));
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      let existingData = JSON.parse(localStorage.getItem("events"));
      existingData = existingData.filter((data) => data.id !== id);
      localStorage.setItem("events", JSON.stringify(existingData));
      setEvents(existingData);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        editEvent,
        deleteEvent,
        selectedDate,
        setSelectedDate,
        getEventsForDate,
        modalOpen,
        setModalOpen,
        selectedEvent,
        setSelectedEvent,
        filterCategory,
        setFilterCategory,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };
