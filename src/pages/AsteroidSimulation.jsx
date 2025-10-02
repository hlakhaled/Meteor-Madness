import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "../components/Earth";
import Starfield from "../components/Starfield";
import AsteroidPanel from "../components/AsteroidPanel";

const AsteroidSimulation = () => {
  return (
    <div 
    style={{
      width: "100vw",
      height: "88vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f0f0f 100%)",
      display: "flex",
      padding: "20px",
      gap: "20px",
      boxSizing: "border-box",
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Left Side - 3D Earth View */}
      <div style={{
        flex: "1 1 65%",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#000",
        border: "1px solid #5E2AC4",
        boxShadow: "0 8px 32px rgba(94, 42, 196, 0.3)",
        minWidth: 0,
        minHeight: 0
      }}>
        <Canvas
          style={{ display: "block", width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          {/* Lighting setup for GLTF model */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          
          {/* Animated starfield background */}
          <Starfield count={5000} />
          
          <Suspense fallback={null}>
            {/* Your GLTF Earth model with adjusted scale */}
            <Earth scale={1} />
            <OrbitControls 
              enableZoom={true} 
              enablePan={false}
              minDistance={4}
              maxDistance={20}
              autoRotate={true}
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Right Side - Asteroid Selection Panel */}
      <div style={{
        flex: "0 0 500px",
        minWidth: "320px",
        maxWidth: "420px",
        minHeight: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        <AsteroidPanel />
      </div>
    </div>
  );
};

export default AsteroidSimulation;