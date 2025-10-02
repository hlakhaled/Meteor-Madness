import React, { useState } from "react";

const AsteroidPanel = () => {
  const [activeTab, setActiveTab] = useState("nasa");
  const [diameter, setDiameter] = useState(100);
  const [velocity, setVelocity] = useState(15);

  const asteroids = [
    { id: 1, name: "99942 Apophis", diameter: "370m", velocity: "12.59 km/s", energy: "1,200 MT", description: "Close approach in 2029" },
    { id: 2, name: "101955 Bennu", diameter: "492m", velocity: "11.18 km/s", energy: "1,450 MT", description: "OSIRIS-REx target" },
    { id: 3, name: "162173 Ryugu", diameter: "900m", velocity: "9.77 km/s", energy: "8,500 MT", description: "Hayabusa2 target" },
    { id: 4, name: "433 Eros", diameter: "16.84 km", velocity: "10.83 km/s", energy: "1,500,000 MT", description: "Near-Earth asteroid" },
    { id: 5, name: "25143 Itokawa", diameter: "330m", velocity: "11.94 km/s", energy: "980 MT", description: "Hayabusa target" },
    { id: 6, name: "4179 Toutatis", diameter: "4.6 km", velocity: "9.73 km/s", energy: "85,000 MT", description: "Tumbling asteroid" },
    { id: 7, name: "1566 Icarus", diameter: "1.4 km", velocity: "22.87 km/s", energy: "95,000 MT", description: "Apollo asteroid" },
    { id: 8, name: "2062 Aten", diameter: "900m", velocity: "17.45 km/s", energy: "12,500 MT", description: "Aten-type asteroid" }
  ];

  return (
    <div 
    className="inter-text"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#0b0b0d",
      borderRadius: "16px",
      padding: "24px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #5E2AC4",
    //   fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(94,42,196,0.15)"
    }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <h2 
        className="inter-text"
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#A78BFA", // lighter violet accent
          margin: 0
        }}>
          Impact Simulator
        </h2>
        <p 
        className="inter-text"
        style={{
          fontSize: "13px",
          color: "#999",
          marginTop: "8px"
        }}>
          Click on Earth to select a region
        </p>

        {/* Tab Buttons */}
        <div 
        className="inter-text"
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px"
        }}>
          {["nasa", "custom"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="inter-text"
              style={{
                flex: 1,
                padding: "12px 16px",
                background: activeTab === tab
                  ? "linear-gradient(135deg, #5E2AC4, #7C3AED)"
                  : "#141416",
                border: `1px solid ${activeTab === tab ? "#7C3AED" : "#333"}`,
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                boxShadow: activeTab === tab ? "0 0 12px rgba(124,58,237,0.5)" : "none"
              }}
            >
              {tab === "nasa" ? "NASA Data" : "Custom"}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: 0,
        paddingRight: "4px"
      }}>
        {activeTab === "nasa" ? (
          asteroids.map((asteroid) => (
            <div
              key={asteroid.id}
              style={{
                backgroundColor: "#141416",
                border: "1px solid #2a2a2d",
                borderRadius: "12px",
                padding: "14px",
                transition: "all 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1c1c20";
                e.currentTarget.style.borderColor = "#5E2AC4";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(94,42,196,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#141416";
                e.currentTarget.style.borderColor = "#2a2a2d";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 
              className="inter-text"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                margin: "0 0 10px 0",
                color: "#fff"
              }}>
                {asteroid.name}
              </h3>
              <div 
              style={{
                fontSize: "12px",
                color: "#aaa",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}>
                <div className="inter-text">Diameter: <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600", fontSize: "" }}>{asteroid.diameter}</span></div>
                <div className="inter-text">Velocity: <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600" }}>{asteroid.velocity}</span></div>
                <div className="inter-text">Impact Energy: <span className="inter-text" style={{ color: "#C4B5FD", fontWeight: "600" }}>{asteroid.energy}</span></div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Sliders */}
            <div>
              <label className="inter-text" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "12px" }}>
                Diameter (meters)
              </label>
              <input
                type="range"
                min="10"
                max="20000"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: `linear-gradient(to right, #7C3AED ${(diameter / 20000) * 100}%, #2a2a2d ${(diameter / 20000) * 100}%)`,
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div  style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#888" }}>
                <span className="inter-text">10m</span>
                <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600" }}>{diameter}m</span>
                <span className="inter-text">20km</span>
              </div>
            </div>

            <div>
              <label className="inter-text" style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "12px" }}>
                Velocity (km/s)
              </label>
              <input
                type="range"
                min="5"
                max="70"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: `linear-gradient(to right, #7C3AED ${((velocity - 5) / 65) * 100}%, #2a2a2d ${((velocity - 5) / 65) * 100}%)`,
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div  style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "#888" }}>
                <span className="inter-text">5 km/s</span>
                <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600" }}>{velocity} km/s</span>
                <span className="inter-text">70 km/s</span>
              </div>
            </div>

            {/* Simulate Button */}
            <button
            className="inter-text"
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #5E2AC4, #7C3AED)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                boxShadow: "0 0 14px rgba(124,58,237,0.5)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 14px rgba(124,58,237,0.5)";
              }}
            >
              Simulate Impact
            </button>
          </div>
        )}
      </div>

      {/* Custom Slider Thumb */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 6px rgba(124,58,237,0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 6px rgba(124,58,237,0.6);
        }
      `}</style>
    </div>
  );
};

export default AsteroidPanel;
