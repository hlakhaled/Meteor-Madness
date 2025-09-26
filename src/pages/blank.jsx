const funFacts = [
  {
    title: "Dinosaur Extinction",
    fact: "The asteroid that killed the dinosaurs was about 6 miles (10 km) wide and created a crater 93 miles (150 km) across in what is now Mexico's Yucatan Peninsula.",
    image: "dinosaur extinction asteroid",
    severity: "Extinction Level",
  },
  {
    title: "Daily Visitors",
    fact: "About 44,000 pounds (20,000 kg) of meteoritic material falls to Earth every day, but most of it burns up in the atmosphere.",
    image: "meteor shower night sky",
    severity: "Harmless",
  },
  {
    title: "Tunguska Event",
    fact: "In 1908, an asteroid or comet exploded over Siberia with the force of 1,000 atomic bombs, flattening 2,000 square kilometers of forest.",
    image: "tunguska explosion forest",
    severity: "Regional",
  },
  {
    title: "Chelyabinsk Meteor",
    fact: "In 2013, a 20-meter asteroid exploded over Russia, creating a shockwave that damaged thousands of buildings and injured over 1,500 people.",
    image: "chelyabinsk meteor russia",
    severity: "City Level",
  },
  {
    title: "Near Misses",
    fact: "Asteroid 2012 DA14 passed within 17,200 miles of Earth in 2013 - closer than many satellites. It was about 50 meters across.",
    image: "asteroid near earth space",
    severity: "Close Call",
  },
  {
    title: "Earth's Shields",
    fact: "Our atmosphere protects us from most small asteroids. Objects smaller than 25 meters usually burn up completely before reaching the ground.",
    image: "meteor burning atmosphere",
    severity: "Protected",
  },
  {
    title: "Impact Frequency",
    fact: "Asteroids large enough to cause regional damage (1 km across) hit Earth about once every 500,000 years on average.",
    image: "asteroid impact simulation",
    severity: "Rare",
  },
  {
    title: "Speed Demons",
    fact: "Asteroids typically hit Earth at speeds between 25,000 and 160,000 mph (40,000-260,000 km/h). The faster they go, the more damage they cause.",
    image: "fast moving asteroid space",
    severity: "High Energy",
  },
];
const getSeverityColor = (severity) => {
  switch (severity) {
    case "Extinction Level":
      return "#8B0000";
    case "Regional":
      return "#FF3333";
    case "City Level":
      return "#FF9933";
    case "Close Call":
      return "#FFE066";
    case "Rare":
      return "#9370DB";
    case "High Energy":
      return "#FF6B6B";
    default:
      return "#4CAF50";
  }
};

function FactCard({ fact, index }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Extinction Level":
        return "#8B0000";
      case "Regional":
        return "#FF3333";
      case "City Level":
        return "#FF9933";
      case "Close Call":
        return "#FFE066";
      case "Rare":
        return "#9370DB";
      case "High Energy":
        return "#FF6B6B";
      default:
        return "#4CAF50";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-[#a566ff] group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-['Jaini:Regular'] text-[24px] group-hover:text-[#a566ff] transition-colors">
          {fact.title}
        </h3>
        <div
          className="px-3 py-1 rounded-full text-[12px] font-semibold text-white"
          style={{ backgroundColor: getSeverityColor(fact.severity) }}
        >
          {fact.severity}
        </div>
      </div>

      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <p className="text-gray-300 text-[16px] leading-relaxed mb-4">
        {fact.fact}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-[#8c58f3] text-[14px] font-semibold">
          Fact #{index + 1}
        </div>
        <div className="w-8 h-8 bg-[#8c58f3] rounded-full flex items-center justify-center">
          <span className="text-white text-[20px]">💫</span>
        </div>
      </div>
    </div>
  );
}

function SizeComparison() {
  const sizes = [
    {
      name: "House",
      size: "20m",
      damage: "Local destruction",
      color: "#FFE066",
    },
    {
      name: "Football Field",
      size: "100m",
      damage: "City damage",
      color: "#FF9933",
    },
    {
      name: "Eiffel Tower",
      size: "300m",
      damage: "Regional impact",
      color: "#FF6B6B",
    },
    {
      name: "Mount Everest",
      size: "9km",
      damage: "Global catastrophe",
      color: "#8B0000",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-8 mb-8">
      <h2 className="text-white font-['Jaini:Regular'] text-[36px] mb-6 text-center">
        Asteroid Size Comparison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sizes.map((size, index) => (
          <div key={index} className="text-center">
            <div
              className="mx-auto mb-4 rounded-full"
              style={{
                width: `${20 + index * 20}px`,
                height: `${20 + index * 20}px`,
                backgroundColor: size.color,
                boxShadow: `0 0 20px ${size.color}50`,
              }}
            />
            <h3 className="text-white font-['Jaini:Regular'] text-[20px] mb-2">
              {size.name}
            </h3>
            <p className="text-gray-300 text-[14px] mb-1">{size.size}</p>
            <p className="text-gray-400 text-[12px]">{size.damage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefenseStrategies() {
  const strategies = [
    {
      name: "Nuclear Deflection",
      description:
        "Detonate nuclear weapons near the asteroid to change its course",
      effectiveness: "High",
      risk: "Radiation",
    },
    {
      name: "Kinetic Impactor",
      description: "Ram a spacecraft into the asteroid to alter its trajectory",
      effectiveness: "Medium",
      risk: "Low",
    },
    {
      name: "Gravity Tractor",
      description:
        "Use a spacecraft's gravity to slowly pull the asteroid off course",
      effectiveness: "Low",
      risk: "Very Low",
    },
    {
      name: "Solar Sail",
      description:
        "Attach reflective material to use solar pressure for deflection",
      effectiveness: "Very Low",
      risk: "Low",
    },
  ];

  return (
    <div className="bg-gradient-to-l from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-8">
      <h2 className="text-white font-['Jaini:Regular'] text-[36px] mb-6 text-center">
        Planetary Defense Strategies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-lg p-4 border border-[#8c58f3]/30"
          >
            <h3 className="text-white font-['Jaini:Regular'] text-[20px] mb-2">
              {strategy.name}
            </h3>
            <p className="text-gray-300 text-[14px] mb-3">
              {strategy.description}
            </p>
            <div className="flex justify-between">
              <span className="text-green-400 text-[12px]">
                Effectiveness: {strategy.effectiveness}
              </span>
              <span className="text-yellow-400 text-[12px]">
                Risk: {strategy.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FunFacts({ onNavigate }) {
  return (
    <div className="bg-black min-h-screen relative" data-name="fun facts">
      <div className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-white font-['Jaini:Regular'] text-[64px] mb-4 [text-shadow:#8c58f3_4px_8px_24px]">
              Asteroid Fun Facts
            </h1>
            <p className="text-gray-300 text-[18px] max-w-2xl mx-auto">
              Discover fascinating facts about asteroids, meteor impacts, and
              how we defend our planet from cosmic threats.
            </p>
          </div>

          <SizeComparison />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {funFacts.map((fact, index) => (
              <FactCard key={index} fact={fact} index={index} />
            ))}
          </div>

          <DefenseStrategies />

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#8c58f3] to-[#a566ff] rounded-xl p-8">
              <h2 className="text-white font-['Jaini:Regular'] text-[36px] mb-4">
                Want to Test Your Skills?
              </h2>
              <p className="text-white text-[16px] mb-6">
                Try our asteroid deflection simulator or explore impact
                scenarios on the world map!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => onNavigate("defend-earth")}
                  className="bg-white text-[#8c58f3] px-8 py-3 rounded-lg font-['Jaini:Regular'] text-[18px] hover:bg-gray-100 transition-colors"
                >
                  Defend Earth
                </button>
                <button
                  onClick={() => onNavigate("asteroid-simulation")}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-['Jaini:Regular'] text-[18px] hover:bg-white hover:text-[#8c58f3] transition-colors"
                >
                  Simulate Impacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
