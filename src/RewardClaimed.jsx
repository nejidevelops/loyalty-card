// RewardClaimed.jsx
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function RewardClaimed() {
  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold text-green-700">🎉 Reward Claimed!</h2>
      <p className="mt-2 text-gray-600">
        Congrats! You've completed a loyalty cycle.
      </p>
      <p className="mt-2 text-blue-600 font-medium">
        🧩 You've leveled up and unlocked a new quest!
      </p>
      <div className="mt-6">
        <a href="/loyalty" className="bg-blue-600 text-white px-4 py-2 rounded">
          View Loyalty Card
        </a>
      </div>
    </div>
  );
}
