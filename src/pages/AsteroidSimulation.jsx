import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import PurbleButton from "../components/PurbleButton";
import AsteroidPropertiesCard from "../components/AsteroidPropertiesCard";
import AsteroidOverlayFrame from "../components/AsteroidOverlayFrame";
import { motion } from "framer-motion";

const AsteroidSimulation = () => {
  const [showCard, setShowCard] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const pageVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.5 } },
  };

  const handleAsteroidSave = (data) => {
    console.log("Saved Asteroid Data:", data);
    setShowCard(false);
  };

  const dummyAsteroids = [
    {
      title: "2009 JR5",
      size: "217 - 485 m",
      speed: "18.1 km/s",
    },
    {
      title: "Apophis",
      size: "370 m",
      speed: "7.4 km/s",
    },
    {
      title: "Bennu",
      size: "490 m",
      speed: "28 km/s",
    },
    {
      title: "Didymos",
      size: "780 m",
      speed: "23 km/s",
    },
    {
      title: "Golevka",
      size: "530 m",
      speed: "29.8 km/s",
    },
    {
      title: "Toutatis",
      size: "2.5 km",
      speed: "11.6 km/s",
    },
    {
      title: "Florence",
      size: "4.9 km",
      speed: "13.5 km/s",
    },
    {
      title: "1981 Midas",
      size: "2.5 km",
      speed: "11.5 km/s",
    },
    {
      title: "Florence",
      size: "4.9 km",
      speed: "13.5 km/s",
    },
    {
      title: "1981 Midas",
      size: "2.5 km",
      speed: "11.5 km/s",
    },
    {
      title: "Florence",
      size: "4.9 km",
      speed: "13.5 km/s",
    },
    {
      title: "1981 Midas",
      size: "2.5 km",
      speed: "11.5 km/s",
    },
    {
      title: "Florence",
      size: "4.9 km",
      speed: "13.5 km/s",
    },
    {
      title: "1981 Midas",
      size: "2.5 km",
      speed: "11.5 km/s",
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <MapComponent />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <PurbleButton onClick={() => setShowOverlay(true)}>
          Pick Astroid
        </PurbleButton>

        <PurbleButton onClick={() => setShowCard(true)}>
          Create Astroid
        </PurbleButton>
      </div>

      {/* Overlay for Create Astroid */}
      {showCard && (
        <div
          onClick={() => setShowCard(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AsteroidPropertiesCard onSave={handleAsteroidSave} />
          </div>
        </div>
      )}

      {/* Overlay Frame for Pick Astroid */}
      {showOverlay && (
        <AsteroidOverlayFrame astroids={dummyAsteroids} onClose={() => setShowOverlay(false)} />
      )}
    </motion.div>
  );
};

export default AsteroidSimulation;
