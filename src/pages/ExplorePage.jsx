import React from "react";
import introVideo from "../assets/intro.mp4";
import GlassButton from "../components/GlassButton";

const ExplorePage = () => {
  const buttons = [
    { label: "Defend Earth", to: "/defend-earth" },
    { label: "Asteroid Simulation", to: "/asteroid-simulation" },
    { label: "Fun Facts", to: "/fun-facts" },
  ];

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background video */}
      <video
        src={introVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-4">
        {/* Title */}
        <h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-jaini text-center"
          style={{
            textShadow: "4px 8px 24px #8C58F3",
          }}
        >
          Meteor Madness
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl">
          {buttons.map((btn, idx) => (
            <GlassButton key={idx} label={btn.label} to={btn.to} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
