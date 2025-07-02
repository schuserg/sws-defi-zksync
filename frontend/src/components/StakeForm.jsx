// src/components/StakeForm.jsx
import { useState } from "react";

const StakeForm = ({ onStake }) => {
  const [amount, setAmount] = useState("");

  const handleStake = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    onStake(amount);
    setAmount(""); // Clear input after stake
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Amount to stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-3 py-2 mr-2"
      />
      <button
        onClick={handleStake}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        🔥 Stake
      </button>
    </div>
  );
};

export default StakeForm;

