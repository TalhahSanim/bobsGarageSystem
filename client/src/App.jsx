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
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

// import GarageContext Provider from GarageContent Component
import { GarageContextProvider } from "./context/GarageContextComponent";

// App Component- sets up routes and page layout
function App() {
  // Removed state and useState and event functions as provider manages our state
  // Provider will manage the state
  // wrap our app in GaraageContextComponent
  // this enables children to access the context

  return (
    <GarageContextProvider>
      <Router>
        <div className="bg-garage-gradient ">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="container mx-auto flex-1 px-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/add-service" element={<AddServices />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </GarageContextProvider>
  );
}

export default App;
