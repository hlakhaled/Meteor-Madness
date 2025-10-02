import React, { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Earth Component with click detection
function Earth({ onTargetSelect, selectedTarget }) {
  const { nodes, materials } = useGLTF('/earth.gltf');
  const meshRef = useRef();
  const { camera, raycaster, pointer } = useThree();
  
  const handleClick = (event) => {
    event.stopPropagation();
    
    // Get intersection point on the sphere
    const intersectionPoint = event.point;
    
    // Convert to lat/lon for display
    const vector = intersectionPoint.clone().normalize();
    const lat = Math.asin(vector.y) * (180 / Math.PI);
    const lon = Math.atan2(vector.x, vector.z) * (180 / Math.PI);
    
    // Determine region based on coordinates
    let region = "Ocean";
    if (Math.abs(lat) > 60) region = lat > 0 ? "Arctic" : "Antarctica";
    else if (lon > -30 && lon < 60 && lat > 0 && lat < 40) region = "Europe";
    else if (lon > 60 && lon < 150 && lat > 10 && lat < 50) region = "Asia";
    else if (lon > -120 && lon < -60 && lat > 25 && lat < 50) region = "North America";
    else if (lon > -80 && lon < -35 && lat > -35 && lat < 10) region = "South America";
    else if (lon > 10 && lon < 50 && lat > -35 && lat < 35) region = "Africa";
    else if (lon > 110 && lon < 155 && lat > -45 && lat < -10) region = "Australia";
    
    onTargetSelect({
      position: intersectionPoint,
      lat: lat.toFixed(2),
      lon: lon.toFixed(2),
      region
    });
  };
  
  return (
    <group dispose={null}>
      <mesh 
        ref={meshRef}
        geometry={nodes.Object_4.geometry} 
        material={materials['Scene_-_Root']} 
        scale={1.128}
        onClick={handleClick}
      />
      {selectedTarget && (
        <mesh position={selectedTarget.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </group>
  );
}

// Starfield Component
const Starfield = ({ count = 5000 }) => {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25 + 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.005;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

// Asteroid Panel Component
const AsteroidPanel = ({ onAsteroidSelect, selectedTarget }) => {
  const [activeTab, setActiveTab] = useState("nasa");
  const [diameter, setDiameter] = useState(100);
  const [velocity, setVelocity] = useState(15);

  const asteroids = [
    { id: 1, name: "99942 Apophis", diameter: 370, velocity: 12.59, energy: "1,200 MT", description: "Close approach in 2029" },
    { id: 2, name: "101955 Bennu", diameter: 492, velocity: 11.18, energy: "1,450 MT", description: "OSIRIS-REx target" },
    { id: 3, name: "162173 Ryugu", diameter: 900, velocity: 9.77, energy: "8,500 MT", description: "Hayabusa2 target" },
    { id: 4, name: "433 Eros", diameter: 16840, velocity: 10.83, energy: "1,500,000 MT", description: "Near-Earth asteroid" },
    { id: 5, name: "25143 Itokawa", diameter: 330, velocity: 11.94, energy: "980 MT", description: "Hayabusa target" },
    { id: 6, name: "4179 Toutatis", diameter: 4600, velocity: 9.73, energy: "85,000 MT", description: "Tumbling asteroid" },
    { id: 7, name: "1566 Icarus", diameter: 1400, velocity: 22.87, energy: "95,000 MT", description: "Apollo asteroid" },
    { id: 8, name: "2062 Aten", diameter: 900, velocity: 17.45, energy: "12,500 MT", description: "Aten-type asteroid" }
  ];

  const handleAsteroidClick = (asteroid) => {
    if (selectedTarget) {
      onAsteroidSelect({
        name: asteroid.name,
        diameter: asteroid.diameter,
        velocity: asteroid.velocity,
        energy: asteroid.energy,
        mass: (Math.PI * Math.pow(asteroid.diameter / 2, 3) * 4 / 3 * 2.5).toFixed(2)
      });
    }
  };

  const handleCustomSimulate = () => {
    if (selectedTarget) {
      const energy = (0.5 * (Math.PI * Math.pow(diameter / 2, 3) * 4 / 3 * 2500) * Math.pow(velocity * 1000, 2) / 4.184e15).toFixed(0);
      onAsteroidSelect({
        name: "Custom Asteroid",
        diameter: parseInt(diameter),
        velocity: parseFloat(velocity),
        energy: `${energy} MT`,
        mass: (Math.PI * Math.pow(diameter / 2, 3) * 4 / 3 * 2.5).toFixed(2)
      });
    }
  };

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
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(94,42,196,0.15)"
    }}>
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <h2 
        className="inter-text"
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#A78BFA",
          margin: 0
        }}>
          Impact Simulator
        </h2>
        <p 
        className="inter-text"
        style={{
          fontSize: "13px",
          color: selectedTarget ? "#4ade80" : "#999",
          marginTop: "8px"
        }}>
          {selectedTarget ? `Target: ${selectedTarget.region} (${selectedTarget.lat}°, ${selectedTarget.lon}°)` : "Click on Earth to select a region"}
        </p>

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
              onClick={() => handleAsteroidClick(asteroid)}
              style={{
                backgroundColor: "#141416",
                border: "1px solid #2a2a2d",
                borderRadius: "12px",
                padding: "14px",
                transition: "all 0.3s",
                cursor: selectedTarget ? "pointer" : "not-allowed",
                opacity: selectedTarget ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (selectedTarget) {
                  e.currentTarget.style.backgroundColor = "#1c1c20";
                  e.currentTarget.style.borderColor = "#5E2AC4";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(94,42,196,0.4)";
                }
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
                <div className="inter-text">Diameter: <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600" }}>{asteroid.diameter}m</span></div>
                <div className="inter-text">Velocity: <span className="inter-text" style={{ color: "#A78BFA", fontWeight: "600" }}>{asteroid.velocity} km/s</span></div>
                <div className="inter-text">Impact Energy: <span className="inter-text" style={{ color: "#C4B5FD", fontWeight: "600" }}>{asteroid.energy}</span></div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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

            <button
            className="inter-text"
              onClick={handleCustomSimulate}
              disabled={!selectedTarget}
              style={{
                width: "100%",
                padding: "14px",
                background: selectedTarget ? "linear-gradient(135deg, #5E2AC4, #7C3AED)" : "#333",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: selectedTarget ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                boxShadow: selectedTarget ? "0 0 14px rgba(124,58,237,0.5)" : "none",
                opacity: selectedTarget ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (selectedTarget) {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTarget) {
                  e.currentTarget.style.boxShadow = "0 0 14px rgba(124,58,237,0.5)";
                }
              }}
            >
              Simulate Impact
            </button>
          </div>
        )}
      </div>

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

// Impact Analysis Component
const ImpactAnalysis = ({ target, asteroid, onClose }) => {
  if (!target || !asteroid) return null;

  const getDevastationLevel = () => {
    const diameter = asteroid.diameter;
    if (diameter < 50) return { level: "LOCAL", color: "#d97706", border: "#fbbf24" };
    if (diameter < 1000) return { level: "CONTINENTAL", color: "#dc2626", border: "#f87171" };
    return { level: "GLOBAL", color: "#7c3aed", border: "#a78bfa" };
  };

  const getImpactEffects = () => {
    const diameter = asteroid.diameter;
    if (diameter < 50) {
      return [
        "Crater formation 3-10 km in diameter",
        "Complete destruction within 50 km radius",
        "Seismic activity equivalent to magnitude 6-7 earthquake",
        "Firestorms and thermal radiation burns"
      ];
    } else if (diameter < 1000) {
      return [
        "Crater 50-100 km in diameter",
        "Destruction across multiple countries",
        "Global tsunami waves if ocean impact",
        "Ash and dust cloud blocking sunlight for months",
        "Agricultural collapse and mass starvation"
      ];
    } else {
      return [
        "Crater 100+ km in diameter",
        "Worldwide devastation and firestorms",
        "Years of volcanic winter",
        "Mass extinction event",
        "Collapse of civilization",
        "Atmosphere damage and ocean acidification"
      ];
    }
  };

  const devastation = getDevastationLevel();
  const effects = getImpactEffects();

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#0b0b0d",
        borderRadius: "16px",
        border: `2px solid ${devastation.border}`,
        maxWidth: "600px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: `0 0 40px ${devastation.color}80`
      }}>
        <div style={{
          padding: "24px",
          borderBottom: `1px solid ${devastation.border}40`
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "32px" }}>⚠️</div>
              <h2 className="inter-text" style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#fff",
                margin: 0
              }}>
                Impact Analysis
              </h2>
            </div>
            <button
              onClick={onClose}
              className="inter-text"
              style={{
                background: "none",
                border: "none",
                color: "#999",
                fontSize: "24px",
                cursor: "pointer",
                padding: "0",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ×
            </button>
          </div>
          
          <div className="inter-text" style={{
            marginTop: "12px",
            fontSize: "16px",
            color: devastation.border
          }}>
            {asteroid.name} → {target.region}
          </div>
          
          <p className="inter-text" style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#999"
          }}>
            Impact scenario for selected target location
          </p>
        </div>

        <div style={{ padding: "24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px"
          }}>
            <div style={{
              backgroundColor: "#141416",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #2a2a2d"
            }}>
              <div className="inter-text" style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Diameter</div>
              <div className="inter-text" style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>{asteroid.diameter}m</div>
            </div>
            
            <div style={{
              backgroundColor: "#141416",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #2a2a2d"
            }}>
              <div className="inter-text" style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Velocity</div>
              <div className="inter-text" style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>{asteroid.velocity} km/s</div>
            </div>
            
            <div style={{
              backgroundColor: "#141416",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #2a2a2d"
            }}>
              <div className="inter-text" style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Mass</div>
              <div className="inter-text" style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>{asteroid.mass} kg</div>
            </div>
            
            <div style={{
              backgroundColor: "#141416",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #2a2a2d"
            }}>
              <div className="inter-text" style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Impact Energy</div>
              <div className="inter-text" style={{ fontSize: "20px", fontWeight: "600", color: "#fff" }}>{asteroid.energy}</div>
            </div>
          </div>

          <div style={{
            backgroundColor: devastation.color + "20",
            border: `2px solid ${devastation.border}`,
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h3 className="inter-text" style={{
              fontSize: "18px",
              fontWeight: "700",
              color: devastation.border,
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              {devastation.level} DEVASTATION
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {effects.map((effect, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>
                    {index === 0 ? "🔥" : index === 1 ? "💥" : index === 2 ? "🌊" : index === 3 ? "⚠️" : index === 4 ? "☠️" : "🌍"}
                  </span>
                  <span className="inter-text" style={{ fontSize: "14px", color: "#fff", lineHeight: "1.6" }}>
                    {effect}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AsteroidSimulation = () => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("default");

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    setSelectedAsteroid(null);
    setShowAnalysis(false);
  };

  const handleAsteroidSelect = (asteroid) => {
    setSelectedAsteroid(asteroid);
    setShowAnalysis(true);
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      backgroundColor: "#000",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      cursor: cursorStyle
    }}>
      <div style={{
        flex: "0 0 65%",
        position: "relative"
      }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent" }}
          onPointerMove={() => setCursorStyle("crosshair")}
          onPointerLeave={() => setCursorStyle("default")}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Starfield />
            <Earth onTargetSelect={handleTargetSelect} selectedTarget={selectedTarget} />
          </Suspense>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div style={{
        flex: "0 0 35%",
        padding: "20px",
        overflowY: "auto"
      }}>
        <AsteroidPanel 
          onAsteroidSelect={handleAsteroidSelect}
          selectedTarget={selectedTarget}
        />
      </div>

      {showAnalysis && (
        <ImpactAnalysis
          target={selectedTarget}
          asteroid={selectedAsteroid}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
};

export default AsteroidSimulation;