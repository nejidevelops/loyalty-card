// FreeFoodQRCode.jsx
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function FreeFoodQRCode({
  url = "http://192.168.100.100:5173/redeem",
}) {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    QRCode.toCanvas(canvasRef1.current, url, { width: 180 });
    QRCode.toCanvas(canvasRef2.current, "http://192.168.100.100:5173/confirm-visit", {
      width: 180,
    });
  }, [url]);

  return (
    <div className="max-w-sm mx-auto p-6 text-center space-y-8">
      <div>
        <h2 className="text-lg font-bold mb-2">🎁 Free Meal QR</h2>
        <canvas ref={canvasRef1} />
        <p className="text-xs mt-2 text-gray-500">{url}</p>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">📍 Visit QR (Scan at Location)</h2>
        <canvas ref={canvasRef2} />
        <p className="text-xs mt-2 text-gray-500">
          http://192.168.100.100:5173/confirm-visit
        </p>
      </div>
    </div>
  );
}

