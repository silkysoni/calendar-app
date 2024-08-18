import React, { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import "./Calendar.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import CategoryFilter from "./CategoryFilter";

const CalendarView = () => {
  const {
    selectedDate,
    setSelectedDate,
    events,
    filterCategory,
    setFilterCategory,
  } = useContext(EventContext);

  const currentMonthIndex = new Date().getMonth();
  const [currentMonth, setCurrentMonth] = useState(currentMonthIndex);

  const months = [
    { name: "January", days: 31, number: "01" },
    { name: "February", days: 28, number: "02" },
    { name: "March", days: 31, number: "03" },
    { name: "April", days: 30, number: "04" },
    { name: "May", days: 31, number: "05" },
    { name: "June", days: 30, number: "06" },
    { name: "July", days: 31, number: "07" },
    { name: "August", days: 31, number: "08" },
    { name: "September", days: 30, number: "09" },
    { name: "October", days: 31, number: "10" },
    { name: "November", days: 30, number: "11" },
    { name: "December", days: 31, number: "12" },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrev = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
      setSelectedDate(null);
    }
  };

  const handleNext = () => {
    if (currentMonth < months.length - 1) {
      setCurrentMonth(currentMonth + 1);
      setSelectedDate(null);
    }
  };

  const handleDayClick = (day) => {
    const monthNumber = months[currentMonth].number;
    const date = `${String(day).padStart(2, "0")}/${monthNumber}/2024`;
    setSelectedDate(date);
  };

  const currentMonthData = months[currentMonth];

  const eventsForMonth = events.filter(
    (event) =>
      event.date.includes(`/${currentMonthData.number}/2024`) &&
      (filterCategory === "All" || event.category === filterCategory)
  );

  const hasEvent = (day) => {
    const date = `${String(day).padStart(2, "0")}/${
      currentMonthData.number
    }/2024`;
    return eventsForMonth.some((event) => event.date === date);
  };

  const isToday = (day) => {
    const today = new Date();
    const date = `${String(day).padStart(2, "0")}/${
      currentMonthData.number
    }/2024`;
    return (
      date ===
      `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/2024`
    );
  };

  const firstDayOfMonth = new Date(2024, currentMonth, 1).getDay();

  return (
    <div className="calendar-container">
      <span id="month-name">2024, {months[currentMonth].name}</span>
      <div>
        <CategoryFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
      </div>

      <div className="calendar">
        <button
          onClick={handlePrev}
          disabled={currentMonth === 0}
          className="button"
        >
          <GrFormPrevious />
        </button>
        <div className="month">
          <div className="days-of-week">
            {daysOfWeek.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>
          <div className="days-grid">
            {Array.from({ length: firstDayOfMonth }, (_, index) => (
              <div key={`empty-${index}`} className="empty-day"></div>
            ))}
            {Array.from({ length: currentMonthData.days }, (_, index) => {
              const day = index + 1;
              const date = `${String(day).padStart(2, "0")}/${
                currentMonthData.number
              }/2024`;

              return (
                <div
                  key={day}
                  className={`day ${hasEvent(day) ? "has-event" : ""} ${
                    isToday(day) ? "today" : ""
                  } ${selectedDate === date ? "selected" : ""}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={currentMonth === months.length - 1}
          className="button"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default CalendarView;
