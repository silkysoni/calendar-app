import React, { useState } from "react";
import { EventProvider } from "./context/EventContext";
import CalendarView from "./components/CalendarView";
import AddEventForm from "./components/AddEventForm";
import "./App.css";
import EventModal from "./modal/EventModal";
import { SnakeBarProvider } from "./context/SnakeBarContext";
import SnakeBar from "./snakeBar/SnakeBar";

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EventProvider>
      <SnakeBarProvider>
        <SnakeBar />
        <EventModal />
        <div>
          <h1 className="heading">CALENDAR</h1>
          <CalendarView />
          <AddEventForm />
        </div>
      </SnakeBarProvider>
    </EventProvider>
  );
};

export default App;
