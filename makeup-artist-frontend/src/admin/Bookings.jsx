export default function Bookings() {

  const bookings = [
    {
      id: 1,
      name: "Priya Sharma",
      service: "Bridal Makeup",
      date: "12 Mar 2026",
      time: "2:00 PM",
      status: "Pending"
    },
    {
      id: 2,
      name: "Riya Patel",
      service: "Evening Glam",
      date: "15 Mar 2026",
      time: "11:00 AM",
      status: "Confirmed"
    }
  ];

  return (
    <div>

      <h1>Bookings</h1>

      <table className="booking-table">

        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.service}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.status}</td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="cancel-btn">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}