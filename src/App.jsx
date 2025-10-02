import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ExplorePage from "./pages/ExplorePage"; // landing
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
      {/* <div className="p-6"> */}
        <Outlet /> {/* where child route content appears */}
      </div>
    // </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page (no navbar) */}
        <Route path="/" element={<ExplorePage />} />

        {/* All pages that need navbar */}
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
