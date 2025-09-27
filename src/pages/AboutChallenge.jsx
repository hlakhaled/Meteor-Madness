import React from "react";
import { assets } from "../assets/assets";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import { motion } from "framer-motion";

import GradientCard from "../components/GradientCard";
export default function AboutChallenge() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const features = [
    {
      title: "Interactive World Map",
      description:
        "Click anywhere on Earth to simulate asteroid impacts and see realistic damage zones based on asteroid size and composition.",
      icon: "🌍",
    },
    {
      title: "Deflection Mini-Game",
      description:
        "Test your skills as a planetary defender! Adjust deflection angles to redirect incoming asteroids away from Earth.",
      icon: "🚀",
    },
    {
      title: "Educational Content",
      description:
        "Learn fascinating facts about real asteroid impacts, planetary defense strategies, and the science behind cosmic threats.",
      icon: "📚",
    },
    {
      title: "Realistic Physics",
      description:
        "Experience scientifically accurate simulations based on real asteroid data and impact physics calculations.",
      icon: "⚗️",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Header
          obj={{
            title: "About Meteor Madness",
            description:
              "Meteor Madness is an interactive platform that teaches asteroid impacts and planetary defense through simulations and mini-games.",
          }}
        />
        <div className="relative h-64 rounded-xl overflow-hidden mb-8 mt-8">
          <img
            src={assets.about}
            alt="asteroid approaching earth space scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8c58f3]/20 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-0 justify-center">
            <div className="bg-black/60 rounded-lg p-6">
              <p className="text-white font-normal text-xl sm:text-2xl">
                "The Earth is the only planet we know of with life. We have to
                protect it." - NASA
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-white font-normal md:text-5xl sm:text-4xl text-3xl mb-8 text-center">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        className="bg-gradient-to-r from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-8 mb-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-white font-normal text-3xl mb-6 text-center">
          Our Mission
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-300 text-xs sm:text-sm font-['Inter'] leading-relaxed mb-4">
              Asteroid impacts are one of the few cosmic catastrophes that
              humanity has the technology to prevent. However, public awareness
              and understanding of these threats remains limited.
            </p>
            <p className="text-gray-300 text-xs sm:text-sm font-['Inter'] leading-relaxed mb-4">
              Meteor Madness bridges this gap by making complex planetary
              defense concepts accessible and engaging through interactive
              simulations, allowing users to experience the challenges and
              solutions firsthand.
            </p>
            <p className="text-[#8c58f3] text-xs font-['Inter'] font-semibold">
              Education today, protection tomorrow.
            </p>
          </div>
          <div className="relative">
            <div className="bg-[#8c58f3]/20 rounded-lg p-8 text-center">
              <div className="text-[72px] mb-4">🛡️</div>
              <h3 className="text-white font-normal md:text-2xl text-xl mb-2">
                Planetary Defense
              </h3>
              <p className="text-white/50 font-['Inter'] text-xs">
                Protecting Earth through science, technology, and education
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <GradientCard
          title="Ready to Defend Earth?"
          desc="Start exploring our interactive simulations and discover how we can protect our planet from cosmic threats!"
        />
      </motion.div>
    </div>
  );
}
