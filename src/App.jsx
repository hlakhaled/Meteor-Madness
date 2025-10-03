import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/Navbar";
import DefendEarth from "./pages/DefendEarth";
import AsteroidSimulation from "./pages/AsteroidSimulation";
import FunFacts from "./pages/FunFacts";
import AboutChallenge from "./pages/AboutChallenge";

// Layout for pages with navbar
function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet /> {/* child routes appear here */}
    </div>
  );
}

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked, waiting for user interaction", err);
        });
      }
    };

    // Try autoplay immediately
    playAudio();

    // Play on first user interaction if blocked
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <Router>
      {/* Continuous background music */}
      <audio ref={audioRef} loop>
        <source src="/music/Sakta.mp3" type="audio/mpeg" />
      </audio>

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<ExplorePage />} />

        {/* Pages with navbar */}
        <Route element={<Layout />}>
          <Route path="defend-earth" element={<DefendEarth />} />
          <Route path="asteroid-simulation" element={<AsteroidSimulation />} />
          <Route path="fun-facts" element={<FunFacts />} />
          <Route path="about-challenge" element={<AboutChallenge />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
