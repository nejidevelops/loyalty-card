// LoyaltyCard.jsx
import { useEffect, useState } from "react";

const VISIT_THRESHOLD = 5;

export default function LoyaltyCard() {
  const [uuid, setUuid] = useState(null);
  const [visitCount, setVisitCount] = useState(0);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  // Add inside LoyaltyCard component:
  const [level, setLevel] = useState(1);
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("zola_loyalty_uuid");
    if (!id) return;
    setUuid(id);

    const visitCount = parseInt(
      localStorage.getItem(`visit_count_${id}`) || "0",
      10
    );
    setVisitCount(visitCount);
    setRewardUnlocked(visitCount >= VISIT_THRESHOLD);

    const userLevel = parseInt(
      localStorage.getItem(`loyalty_level_${id}`) || "1",
      10
    );
    setLevel(userLevel);

    const unlockedQuest = localStorage.getItem(`unlocked_quest_${id}`);
    setQuest(unlockedQuest);
  }, []);

  // LoyaltyCard.jsx (local version)
  useEffect(() => {
    const id = localStorage.getItem("zola_loyalty_uuid");
    if (!id) return;
    setUuid(id);

    // Simulated local visit count
    const localKey = `visit_count_${id}`;
    const count = parseInt(localStorage.getItem(localKey) || "0", 10);
    setVisitCount(count);
    setRewardUnlocked(count >= VISIT_THRESHOLD);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center border rounded-md shadow">
      <h2 className="text-lg font-bold">Loyalty Card</h2>
      {uuid ? (
        <>
          <p className="mt-2 text-gray-500">ID: {uuid.slice(0, 8)}...</p>
          <div className="my-4 flex justify-center gap-2">
            {[...Array(VISIT_THRESHOLD)].map((_, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded-full border ${
                  i < visitCount ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">Level: {level}</p>
          {quest && (
            <p className="mt-1 text-blue-600 font-medium">🧩 Quest: {quest}</p>
          )}

          {rewardUnlocked ? (
            <p className="text-green-700 font-semibold">🎁 Reward Unlocked!</p>
          ) : (
            <p className="text-gray-500">
              Visit {VISIT_THRESHOLD - visitCount} more times to unlock a
              reward.
            </p>
          )}
        </>
      ) : (
        <p className="text-red-500">
          No card found. Please redeem your free item first.
        </p>
      )}
    </div>
  );
}
