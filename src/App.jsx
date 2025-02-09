import { useState, useEffect } from "react";
import { FaCog, FaChartBar, FaSkull, FaTrophy } from "react-icons/fa";
import "./App.css";

function App() {
  const [gameStats, setGameStats] = useState({
    kills: 0,
    deaths: 0,
    assists: 0,
    level: 1,
    gold: 0,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  // Mock function to simulate random game events
  const simulateGameEvent = () => {
    const randomEvent = Math.random();
    const newStats = { ...gameStats };

    if (randomEvent < 0.3) {
      newStats.kills += 1;
      console.log("Mock Event: Kill!");
    } else if (randomEvent < 0.6) {
      newStats.deaths += 1;
      console.log("Mock Event: Death!");
    } else if (randomEvent < 0.8) {
      newStats.assists += 1;
      console.log("Mock Event: Assist!");
    }

    // Randomly increase level and gold as well
    if (Math.random() > 0.95) {
      newStats.level += 1;
      console.log("Mock Event: Level Up!");
    }
    if (Math.random() > 0.9) {
      newStats.gold += Math.floor(Math.random() * 100);
      console.log("Mock Event: Gold Earned!");
    }

    setGameStats(newStats);
  };

  useEffect(() => {
    // Simulate game start and periodic events
    setGameRunning(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
      simulateGameEvent(); // Trigger mock game events every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-4 right-4 text-white">
      <div className="bg-overlay-bg p-4 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-overlay-accent font-bold">Game Stats</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <FaChartBar />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <FaCog />
            </button>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-yellow-500" />
            <span>Match Time: {formatTime(timer)}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-overlay-accent">Kills</div>
              <div className="text-xl font-bold">{gameStats.kills}</div>
            </div>
            <div className="text-center">
              <div className="text-overlay-accent">Deaths</div>
              <div className="text-xl font-bold">{gameStats.deaths}</div>
            </div>
            <div className="text-center">
              <div className="text-overlay-accent">Assists</div>
              <div className="text-xl font-bold">{gameStats.assists}</div>
            </div>
          </div>

          {showDetails && (
            <div className="border-t border-gray-600 pt-4 mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Level:</span>
                <span className="text-overlay-accent">{gameStats.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Gold:</span>
                <span className="text-overlay-accent">{gameStats.gold}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {gameStats.kills > 0 && (
        <div className="mt-4 bg-overlay-bg p-2 rounded-lg animate-fade-in">
          <div className="flex items-center gap-2 text-sm">
            <FaSkull className="text-red-500" />
            <span>You got a kill!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
