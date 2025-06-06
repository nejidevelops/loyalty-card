import { useEffect, useState } from "react";

const QUESTS = {
  1: [{ id: "q1", text: "Visit 5 times to unlock a free coffee ☕" }],
  2: [{ id: "q2", text: "Refer a friend and get a dessert 🍰" }],
  3: [{ id: "q3", text: "Buy 3 drinks in a week to earn a mug 🥤" }],
  4: [{ id: "q4", text: "Complete feedback survey for bonus points 📝" }],
};

export default function QuestList() {
  const [uuid, setUuid] = useState(null);
  const [level, setLevel] = useState(1);
  const [quests, setQuests] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("zola_loyalty_uuid");
    if (!id) return;
    setUuid(id);

    const userLevel = parseInt(localStorage.getItem(`loyalty_level_${id}`) || "1", 10);
    setLevel(userLevel);

    // Fetch completed quest list
    const completedList = JSON.parse(localStorage.getItem(`completed_quests_${id}`) || "[]");
    setCompleted(completedList);

    // Combine all quests up to current level
    const unlocked = [];
    for (let i = 1; i <= userLevel; i++) {
      if (QUESTS[i]) unlocked.push(...QUESTS[i]);
    }
    setQuests(unlocked);
  }, []);

  const toggleComplete = (questId) => {
    const key = `completed_quests_${uuid}`;
    let updated = [...completed];

    if (completed.includes(questId)) {
      updated = updated.filter((id) => id !== questId);
    } else {
      updated.push(questId);
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setCompleted(updated);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow text-left">
      <h2 className="text-lg font-bold mb-3">🎯 Your Quest Log</h2>
      {quests.length === 0 ? (
        <p className="text-gray-500">No quests yet. Start visiting to unlock!</p>
      ) : (
        <ul className="space-y-4">
          {quests.map((quest) => (
            <li
              key={quest.id}
              className={`flex justify-between items-center p-2 rounded ${
                completed.includes(quest.id) ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <span className={completed.includes(quest.id) ? "line-through text-green-600" : ""}>
                {quest.text}
              </span>
              <button
                onClick={() => toggleComplete(quest.id)}
                className={`text-xs px-3 py-1 rounded ${
                  completed.includes(quest.id)
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {completed.includes(quest.id) ? "Done" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
