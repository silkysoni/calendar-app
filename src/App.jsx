import React, { useState } from "react";
import { EventProvider } from "./context/EventContext";
import CalendarView from "./components/CalendarView";
import AddEventForm from "./components/AddEventForm";
import "./App.css";
import EventModal from "./modal/EventModal";

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EventProvider>
      <EventModal />
      <div>
        <h1 className="heading">CALENDAR</h1>
        <CalendarView />
        <AddEventForm />
      </div>
    </EventProvider>
  );
};

export default App;
