import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react router dom imports
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Products from "./components/pages/products/Products";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

function App() {
  return (
    <Router>
      <div className="bg-garage-gradient ">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto flex-1 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
