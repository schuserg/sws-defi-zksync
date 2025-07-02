// src/components/ConnectWallet.jsx
import { useState, useEffect } from "react";

const ConnectWallet = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  // Connect to MetaMask
  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      onConnect(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="mb-4">
      <button
        onClick={connect}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "🔗 Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;

