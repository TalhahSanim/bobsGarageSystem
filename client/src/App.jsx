import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react router dom imports
import "./App.css";
// Import custom components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Services from "./components/pages/services/Services";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import AddServices from "./components/pages/services/AddServices";
import EditService from "./components/pages/services/EditService";
import ServiceDetails from "./components/pages/services/ServiceDetails";
import SavedServices from "./components/pages/services/SavedServices";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Dashboard Components
import Dashboard from "./components/pages/admin/Dashboard";
import Users from "./components/pages/admin/Users";
import EditUser from "./components/pages/admin/EditUser";
import AddUser from "./components/pages/admin/AddUser";
import UploadImage from "./components/pages/admin/UploadImage";
import SystemOverview from "./components/pages/admin/SystemOverview";
import Interest from "./components/pages/admin/Interest";

import BottomNav from "./components/layout/BottomNav";

// Not found
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/auth/Profile";

// App Component- sets up routes and page layout
export default function App() {
  // Removed state and useState and event functions as provider manages our state
  // Provider will manage the state
  // wrap our app in GaraageContextComponent
  // this enables children to access the context

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-page pb-18 text-ink lg:pb-0  ">
        <Header />
        <main className=" mx-auto w-full max-w-6xl flex-1 px-4 py-10 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-service" element={<AddServices />} />
            <Route path="/edit/:id" element={<EditService />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin dashboard and the child shows dashboards <Outlets */}
            <Route path="/admin" element={<Dashboard />}>
              <Route index element={<SystemOverview />} />
              <Route path="users" element={<Users />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="users-add" element={<AddUser />} />
              <Route path="images-new" element={<UploadImage />} />
              <Route path="interests" element={<Interest />} />
            </Route>
            {/* Any other address triggers the 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}
