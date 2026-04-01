import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../Super-Admin-Panel/Layout/AdminLayout";
import Dashboard from "../../Super-Admin-Panel/Dashboard/Pages/Dashboard";

// Parking Module
import ParkingList from "../../Super-Admin-Panel/Parking-Management/Pages/ParkingList";
import AddParking from "../../Super-Admin-Panel/Parking-Management/Pages/AddParking";
import EditParking from "../../Super-Admin-Panel/Parking-Management/Pages/EditParking";
import ParkingDetails from "../../Super-Admin-Panel/Parking-Management/Pages/ParkingDetails";

// Slot Management
import SlotList from "../../Super-Admin-Panel/Slot-Management/Pages/SlotList";

// Booking Management
import BookingList from "../../Super-Admin-Panel/Booking-Management/Pages/BookingList";
import BookingDetails from "../../Super-Admin-Panel/Booking-Management/Pages/BookingDetails";

// User Management
import UserList from "../../Super-Admin-Panel/User-Management/Pages/UserList";
import UserDetails from "../../Super-Admin-Panel/User-Management/Pages/UserDetails";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Parking Management */}
        <Route path="parking" element={<ParkingList />} />
        <Route path="parking/add" element={<AddParking />} />
        <Route path="parking/edit/:id" element={<EditParking />} />
        <Route path="parking/details/:id" element={<ParkingDetails />} />

        {/* Slot Management */}
        <Route path="slots" element={<ParkingList />} />
        <Route path="slots/:parkingId" element={<SlotList />} />

        {/* Booking Management */}
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetails />} />

        {/* User Management */}
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetails />} />

        {/* Static placeholders for other modules */}
        <Route path="wallet" element={<div>Wallet Page</div>} />
        <Route path="reports" element={<div>Reports Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
