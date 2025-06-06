// RedeemPage.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { Link } from "react-router-dom";

export default function RedeemPage() {
  const [uuid, setUuid] = useState(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    const localKey = "zola_loyalty_uuid";
    let existingUuid = localStorage.getItem(localKey);

    if (!existingUuid) {
      existingUuid = uuidv4(); // new UUID
      localStorage.setItem(localKey, existingUuid);
    }

    setUuid(existingUuid);
  }, []);

  const handleClaim = async () => {
    setRewardClaimed(true);

    // Generate QR code for the "Free Meal Coupon"
    const qrUrl = `https://yourdomain.com/verify-coupon?uuid=${uuid}`;
    const qr = await QRCode.toDataURL(qrUrl);
    setQrDataUrl(qr);

    // Optional: POST to backend to mark coupon as issued
    // await fetch("/api/start-loyalty", { method: "POST", body: JSON.stringify({ uuid }) });
  };

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
