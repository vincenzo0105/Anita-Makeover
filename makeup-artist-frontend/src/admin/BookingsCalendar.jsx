import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

export default function BookingsCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <div>

      <h1>Bookings Calendar</h1>

      <Calendar
        onChange={setDate}
        value={date}
      />

      <p>Selected date: {date.toDateString()}</p>

    </div>
  );
}