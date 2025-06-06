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
    const stored = parseInt(localStorage.getItem(localKey) || "0", 10);
    const newCount = Math.min(stored + 1, VISIT_THRESHOLD);
    localStorage.setItem(localKey, newCount.toString());

    if (newCount >= VISIT_THRESHOLD) {
      setMessage("🎉 You've reached your reward!");
      setTimeout(() => {
        navigate("/loyalty"); // Or `/redeem` if you prefer
      }, 1500); // Delay for user to read the message
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
