// App.jsx
import { Routes, Route } from "react-router-dom";
import LoyaltyCard from "./LoyaltyCard";
import FreeFoodQRCode from "./FreeFoodQRCode";
import RedeemPage from "./RedeemPage";
import ConfirmVisit from "./confirmVisit";
import RewardClaimed from "./RewardClaimed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoyaltyCard />} />
      <Route path="/loyalty" element={<LoyaltyCard />} />
      <Route path="/qr" element={<FreeFoodQRCode />} />
      <Route path="/redeem" element={<RedeemPage />} />
      <Route path="/confirm-visit" element={<ConfirmVisit />} />
      <Route path="/reward-claimed" element={<RewardClaimed />} />
    </Routes>
  );
}

export default App;
