import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import Packages from "./pages/Packages"; 
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import BookingPage from "./pages/BookingPage";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:slug" element={<ActivityDetails />} />
        <Route path="/packages" element={<Packages />} />

        <Route path="/packages/:slug" element={<PackageDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
