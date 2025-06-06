import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import QRCode from "qrcode";

export default function RewardClaimed() {
  const [uuid, setUuid] = useState("");
  const [level, setLevel] = useState(1);
  const [unlockedQuest, setUnlockedQuest] = useState("");
  const [reward, setReward] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const REWARDS = {
    1: "☕ Free Coffee",
    2: "🍰 Dessert Slice",
    3: "🥤 Loyalty Mug",
    4: "🎁 Bonus Points Pack",
  };

  const QUESTS = {
    2: "Refer a friend and get a dessert 🍰",
    3: "Buy 3 drinks in a week to earn a mug 🥤",
    4: "Complete feedback survey for bonus points 📝",
  };

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    const id = localStorage.getItem("zola_loyalty_uuid");
    if (!id) return;

    setUuid(id);

    const currentLevel = parseInt(localStorage.getItem(`loyalty_level_${id}`) || "1", 10);
    setLevel(currentLevel);

    // Get reward based on *previous* level (since it was just incremented)
    const prevReward = REWARDS[currentLevel - 1] || "🎉 Gift";
    setReward(prevReward);

    // Show quest for new level
    const newQuest = QUESTS[currentLevel] || "🎯 Keep playing to unlock more!";
    setUnlockedQuest(newQuest);

    // Create a QR code link (can be to your system to verify reward)
    const qr = `https://yourdomain.com/redeem-gift?uuid=${id}&level=${currentLevel - 1}`;
    setQrUrl(qr);

    QRCode.toDataURL(qr).then((url) => setQrDataUrl(url));
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold text-green-700">🎉 Reward Claimed!</h2>
      <p className="mt-2 text-gray-600">
        Congrats! You've completed loyalty level {level - 1}.
      </p>

      <div className="mt-4 border border-green-200 bg-green-50 rounded p-4">
        <p className="text-lg font-semibold">🎁 Your Reward:</p>
        <p className="text-xl text-green-700 font-bold">{reward}</p>
      </div>

      <div className="mt-6 border border-blue-200 bg-blue-50 rounded p-4">
        <p className="text-lg font-semibold">🧩 New Quest Unlocked:</p>
        <p className="text-blue-700 font-medium">{unlockedQuest}</p>
      </div>

      {qrDataUrl && (
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">Show this to staff to redeem your reward:</p>
          <img src={qrDataUrl} alt="Reward QR Code" className="mx-auto w-40" />
          <p className="mt-2 text-xs text-gray-400">{qrUrl}</p>
        </div>
      )}

      <div className="mt-6">
        <a
          href="/loyalty"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          View Loyalty Card
        </a>
      </div>
    </div>
  );
}
