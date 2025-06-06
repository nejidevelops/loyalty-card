// RewardClaimed.jsx
import { useEffect, useState } from "react";
import { getOrCreateUUID } from "./utils/uuid";
import confetti from "canvas-confetti";
import QRCode from "qrcode";

export default function RewardClaimed() {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

    const uuid = getOrCreateUUID();

    fetch(`http://localhost:4000/loyalty-status/${uuid}`)
      .then((res) => res.json())
      .then((data) => {
        const unclaimed = data.rewardHistory.find((r) => !r.claimed);
        setReward(unclaimed);
      });
  }, []);

  const handleClaim = async () => {
    const uuid = getOrCreateUUID();
    const res = await fetch("http://localhost:4000/redeem-reward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid, rewardIndex: reward.index }),
    });

    if (res.ok) {
      alert("✅ Reward marked as claimed!");
    }
  };

  if (!reward) return <p className="text-center mt-10">Loading reward...</p>;

  return (
    <div className="max-w-md mx-auto text-center space-y-6 p-6">
      <h2 className="text-2xl font-bold text-green-700">🎉 Reward Claimed!</h2>
      <p className="text-gray-600">{reward.reward}</p>
      <QRCode value="http://localhost:5173/redeem" size={128} />
      <p className="text-blue-600">Show this QR to staff to redeem your reward.</p>
      <button onClick={handleClaim} className="bg-blue-600 text-white px-4 py-2 rounded">
        Mark as Claimed
      </button>
    </div>
  );
}
