// File -> client/src/App.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// App -> Header, Every Route, Footer & mobile BottomNav

import { lazy, Suspense } from "react"; // lazy loads pages, Suspense shows fallback while they load
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react router dom imports
import "./App.css";
// Always shown on first load so imported normally
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Home from "./components/pages/Home";

// Pages load only when visited which splits the bundle into smaller files
const Services = lazy(() => import("./components/pages/services/Services"));
const About = lazy(() => import("./components/pages/About"));
const Credits = lazy(() => import("./components/pages/Credits"));
const AddServices = lazy(
  () => import("./components/pages/services/AddServices"),
);
const EditService = lazy(
  () => import("./components/pages/services/EditService"),
);
const ServiceDetails = lazy(
  () => import("./components/pages/services/ServiceDetails"),
);
const FavouritedServices = lazy(
  () => import("./components/pages/services/FavouritedServices"),
);
const Inbox = lazy(() => import("./components/pages/enquiries/Inbox"));
const Login = lazy(() => import("./components/pages/auth/Login"));
const Register = lazy(() => import("./components/pages/auth/Register"));
const Profile = lazy(() => import("./components/pages/auth/Profile"));

// Dashboard Components
const Dashboard = lazy(() => import("./components/pages/admin/Dashboard"));
const SystemOverview = lazy(
  () => import("./components/pages/admin/SystemOverview"),
);
const Users = lazy(() => import("./components/pages/admin/Users"));
const EditUser = lazy(() => import("./components/pages/admin/EditUser"));
const AddUser = lazy(() => import("./components/pages/admin/AddUser"));
const UploadImage = lazy(() => import("./components/pages/admin/UploadImage"));
const Favourites = lazy(() => import("./components/pages/admin/Favourites"));
const Enquiries = lazy(() => import("./components/pages/admin/Enquiries"));

// Not found
const NotFound = lazy(() => import("./components/pages/NotFound"));

// App Component- sets up routes and page layout
export default function App() {
  // Removed state and useState and event functions as provider manages our state
  // Provider will manage the state
  // wrap our app in GarageContextComponent
  // this enables children to access the context

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-page pb-18 text-ink lg:pb-0  ">
        <Header />
        <main className=" mx-auto w-full max-w-6xl flex-1 px-4 py-10 ">
          {/* Shows Loading while a page's file downloads and header and footer stay on screen */}
          <Suspense
            fallback={<p className="text-center text-ink">Loading...</p>}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/add-service" element={<AddServices />} />
              <Route path="/edit/:id" element={<EditService />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <FavouritedServices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inbox"
                element={
                  <ProtectedRoute>
                    <Inbox />
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
                <Route path="favourites" element={<Favourites />} />

                <Route
                  path="enquiries"
                  element={
                    <ProtectedRoute adminOnly>
                      <Enquiries />
                    </ProtectedRoute>
                  }
                />
              </Route>
              {/* Any other address triggers the 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}
