import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VISIT_THRESHOLD = 5;

export default function ConfirmVisit() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = localStorage.getItem("zola_loyalty_uuid");
    if (!uuid) {
      setMessage("No loyalty card found.");
      return;
    }

    const localKey = `visit_count_${uuid}`;
    const levelKey = `loyalty_level_${uuid}`;
    const questKey = `unlocked_quest_${uuid}`;

    const stored = parseInt(localStorage.getItem(localKey) || "0", 10);
    const newCount = Math.min(stored + 1, VISIT_THRESHOLD);

    localStorage.setItem(localKey, newCount.toString());

    if (newCount >= VISIT_THRESHOLD) {
      // Reset visit count
      localStorage.setItem(localKey, "0");

      // Increase user level
      const currentLevel = parseInt(localStorage.getItem(levelKey) || "1", 10);
      localStorage.setItem(levelKey, (currentLevel + 1).toString());

      // Unlock next quest (simulate)
      localStorage.setItem(questKey, "New Quest Unlocked");

      setMessage("🎉 You've reached your reward!");

      setTimeout(() => {
        navigate("/reward-claimed");
      }, 1500);
    } else {
      setMessage(`✅ Visit confirmed! Visit count is now ${newCount}`);
    }
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <p>{message || "Confirming visit..."}</p>
    </div>
  );
}
