import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Customize from "./pages/Customize";
import Details from "./pages/Details";
import About from "./pages/About";
import PaymentPage from "./pages/PaymentPage"; // ✅ NEW

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Bookings from "./admin/Bookings";
import AdminLogin from "./admin/AdminLogin";
import ServicesManager from "./admin/ServicesManager";
import PortfolioManager from "./admin/PortfolioManager";
import BookingsCalendar from "./admin/BookingsCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/details" element={<Details />} />
        <Route path="/about" element={<About />} />

        {/* ✅ NEW PAYMENT ROUTE */}
        <Route path="/payment/:id" element={<PaymentPage />} />

        {/* Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <Protected>
              <AdminLayout />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<BookingsCalendar />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="portfolio" element={<PortfolioManager />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;