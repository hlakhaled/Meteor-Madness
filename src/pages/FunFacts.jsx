import React from "react"; 
import { useNavigate } from "react-router-dom";
import FactCard from "../components/FactCard";
import SizeCard from "../components/SizeCard";
import DefenseStrategies from "../components/DefenseStrategies";
import { assets } from "../assets/assets";
const FunFacts = () => {
    const navigate = useNavigate();
  const sizes = [
    {
      
      name: "House",
      size: "20m",
      damage: "Local destruction",
      color: "#FFE066",
      scale: 30,
    },
    {
      name: "Football Field",
      size: "100m",
      damage: "City damage",
      color: "#FF9933",
      scale: 45,
    },
    {
      name: "Eiffel Tower",
      size: "300m",
      damage: "Regional impact",
      color: "#FF6B6B",
      scale: 60,
    },
    {
      name: "Mount Everest",
      size: "9km",
      damage: "Global catastrophe",
      color: "#8B0000",
      scale: 75,
    },
  ];
  const funFacts = [
    {
      title: "Dinosaur Extinction",
      fact: "The asteroid that killed the dinosaurs was about 6 miles (10 km) wide and created a crater 93 miles (150 km) across in what is now Mexico's Yucatan Peninsula.",
      image: assets.DinosaurExtinction,
      severity: "Extinction",
    },
    {
      title: "Daily Visitors",
      fact: "About 44,000 pounds (20,000 kg) of meteoritic material falls to Earth every day, but most of it burns up in the atmosphere.",
      image: assets.DailyVisitors,
      severity: "Harmless",
    },
    {
      title: "Tunguska Event",
      fact: "In 1908, an asteroid or comet exploded over Siberia with the force of 1,000 atomic bombs, flattening 2,000 square kilometers of forest.",
      image: assets.TunguskaEvent,
      severity: "Regional",
    },
    {
      title: "Chelyabinsk Meteor",
      fact: "In 2013, a 20-meter asteroid exploded over Russia, creating a shockwave that damaged thousands of buildings and injured over 1,500 people.",
      image: assets.ChelyabinskMeteor,
      severity: "City",
    },
    {
      title: "Near Misses",
      fact: "Asteroid 2012 DA14 passed within 17,200 miles of Earth in 2013 - closer than many satellites. It was about 50 meters across.",
      image: assets.NearMisses,
      severity: "Close Call",
    },
    {
      title: "Earth's Shields",
      fact: "Our atmosphere protects us from most small asteroids. Objects smaller than 25 meters usually burn up completely before reaching the ground.",
      image: assets.Earthshields,
      severity: "Protected",
    },
    {
      title: "Impact Frequency",
      fact: "Asteroids large enough to cause regional damage (1 km across) hit Earth about once every 500,000 years on average.",
      image: assets.ImpactFrequency,
      severity: "Rare",
    },
    {
      title: "Speed Demons",
      fact: "Asteroids typically hit Earth at speeds between 25,000 and 160,000 mph (40,000-260,000 km/h). The faster they go, the more damage they cause.",
      image: assets.SpeedDemons,
      severity: "High Energy",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 [text-shadow:#8c58f3_4px_8px_24px]">
          Asteroid Fun Facts
        </h1>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto font-['Inter']">
          Discover fascinating facts about asteroids, meteor impacts, and how we
          defend our planet from cosmic threats.
        </p>
      </div>

      {/* Size Comparison */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d1b4e] border border-[#8c58f3]/40 rounded-2xl p-6 sm:p-10 shadow-lg mb-12">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-normal mb-8 text-center">
          Asteroid Size Comparison
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 ">
          {sizes.map((size, index) => (
            <SizeCard key={index} size={size} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {funFacts.map((fact, index) => (
          <FactCard key={index} fact={fact} index={index} />
        ))}
      </div>
        <DefenseStrategies />
        
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#8c58f3] to-[#a566ff] rounded-xl p-8">
              <h2 className=" font-normal sm:text-4xl text-2xl mb-4">
                Want to Test Your Skills?
              </h2>
              <p className=" font-light text-sm font-['Inter'] mb-6">
                Try our asteroid deflection simulator or explore impact
                scenarios on the world map!
              </p>
              <div className="flex sm:gap-4 sm:flex-row flex-col  gap-8 justify-center">
                <button
                  onClick={() => navigate("/defend-earth")}
                  className="bg-transparent border-2 border-white text-white sm:px-8 px-6  py-3 rounded-lg text-sm sm:text-xl hover:bg-white hover:text-[#8c58f3] transition-all"
                >
                  Defend Earth
                </button>
                <button
                  onClick={() => navigate("/asteroid-simulation")}
                  className="bg-transparent border-2 border-white text-white sm:px-8 px-6  py-3 rounded-lg text-sm sm:text-xl hover:bg-white hover:text-[#8c58f3] transition-all"
                >
                  Simulate Impacts
                </button>
              </div>
            </div>
          </div>
     
    </div>
  );
};

export default FunFacts;
