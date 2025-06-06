// ConfirmVisit.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateUUID } from "./utils/uuid";

export default function ConfirmVisit() {
  const [message, setMessage] = useState("Confirming...");
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = getOrCreateUUID();

    fetch("http://localhost:4000/confirm-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user.rewardHistory?.some((r) => !r.claimed)) {
          navigate("/reward-claimed");
        } else {
          setMessage("✅ Visit recorded! Keep going!");
        }
      });
  }, [navigate]);

  return <div className="text-center mt-10 text-lg">{message}</div>;
}
