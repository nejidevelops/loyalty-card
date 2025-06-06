import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { Link } from "react-router-dom";

// Embedded form logic
function FirstTimeForm({ onComplete }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) return;

    const uuid = localStorage.getItem("zola_loyalty_uuid");
    const userInfo = { uuid, name, phone, createdAt: new Date().toISOString() };
    localStorage.setItem("zola_user_info", JSON.stringify(userInfo));

    onComplete(); // Notify parent to continue
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">👋 Welcome!</h2>
        <p className="text-sm text-gray-600 mb-4">Enter your info to claim your first reward.</p>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit & Claim
        </button>
      </div>
    </div>
  );
}

export default function RedeemPage() {
  const [uuid, setUuid] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    const localKey = "zola_loyalty_uuid";
    let existingUuid = localStorage.getItem(localKey);
    if (!existingUuid) {
      existingUuid = uuidv4();
      localStorage.setItem(localKey, existingUuid);
    }
    setUuid(existingUuid);

    const userInfo = localStorage.getItem("zola_user_info");
    setShowForm(!userInfo); // show form if user info not saved
  }, []);

  const handleClaim = async () => {
    setRewardClaimed(true);

    const qrUrl = `https://yourdomain.com/verify-coupon?uuid=${uuid}`;
    const qr = await QRCode.toDataURL(qrUrl);
    setQrDataUrl(qr);
  };

  if (showForm) {
    return <FirstTimeForm onComplete={() => setShowForm(false)} />;
  }

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4">🎉 Welcome!</h1>
      {!rewardClaimed ? (
        <>
          <p>Enjoy your first free coffee 🍵</p>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleClaim}
          >
            Claim Free Coffee
          </button>
        </>
      ) : (
        <>
          <p className="text-green-700 font-semibold">✅ Free Meal Coupon Issued</p>
          {qrDataUrl && (
            <img src={qrDataUrl} alt="Free Meal QR" className="mt-4 mx-auto w-40" />
          )}
          <p className="text-sm text-gray-500 mt-2">
            Show this QR to a staff member to redeem.
          </p>
          <Link to="/loyalty" className="inline-block mt-4 text-blue-600 underline">
            View Your Loyalty Card
          </Link>
        </>
      )}
    </div>
  );
}
