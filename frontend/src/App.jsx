import { useEffect, useState } from "react";
import { ethers } from "ethers";
import stakingAbi from "./abi/SWSStaking.abi.json";
import swsAbi from "./abi/SWSToken.abi.json";
import addresses from "./deployed_addresses.json";

export default function App() {
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState("Your staked balance: -");
  const [amount, setAmount] = useState("");
  const [stakingContract, setStakingContract] = useState(null);
  const [swsContract, setSwsContract] = useState(null);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const sws = new ethers.Contract(addresses.SWSTOKEN_ADDRESS, swsAbi, signer);
      const staking = new ethers.Contract(addresses.SWSSTAKING_ADDRESS, stakingAbi, signer);

      setSwsContract(sws);
      setStakingContract(staking);

      // Approve max tokens once
      try {
        const tx = await sws.approve(addresses.SWSSTAKING_ADDRESS, ethers.MaxUint256);
        await tx.wait();
      } catch (err) {
        console.error("Approve error:", err);
        setMessage("❌ Approve error");
        return;
      }

      setMessage("🔗 Connected: " + accounts[0]);
    } catch (err) {
      console.error("Connect error:", err);
      setMessage("❌ Connection error");
    }
  };

  const refreshBalance = async () => {
    if (!account || !stakingContract || !swsContract) return;
    try {
      const balance = await swsContract.balanceOf(account);
      const staked = await stakingContract.stakedBalance(account);
      const reward = await stakingContract.calculateReward(account);
      setMessage(`Balance: ${ethers.formatUnits(balance, 18)} SWST | Staked: ${ethers.formatUnits(staked, 18)} | Reward: ${ethers.formatUnits(reward, 18)} DOL`);
    } catch (err) {
      console.error("Balance error:", err);
      setMessage("Error fetching balance");
    }
  };

  const stake = async () => {
    if (!stakingContract || !swsContract || !amount) return;
    try {
      const parsed = ethers.parseUnits(amount, 18);
      const tx = await stakingContract.stake(parsed);
      await tx.wait();
      setMessage(`✅ Staked: ${amount}`);
    } catch (err) {
      console.error("Stake error:", err);
      setMessage("⛔ Contract cannot stake (possibly no approval or zero balance)");
    }
  };

  const claim = async () => {
    if (!stakingContract) return;
    try {
      const tx = await stakingContract.claim();
      await tx.wait();
      setMessage("🎉 Reward claimed successfully");
    } catch (err) {
      console.error("Claim error:", err);
      setMessage("❌ Claim error");
    }
  };

  const withdraw = async () => {
    if (!stakingContract || !amount) return;
    try {
      const parsed = ethers.parseUnits(amount, 18);
      const tx = await stakingContract.withdraw(parsed);
      await tx.wait();
      setMessage(`✅ Withdrawn: ${amount}`);
    } catch (err) {
      console.error("Withdraw error:", err);
      setMessage("❌ Withdraw error");
    }
  };

  const withdrawAll = async () => {
    if (!stakingContract) return;
    try {
      const tx = await stakingContract.withdrawAll();
      await tx.wait();
      setMessage("✅ All funds withdrawn");
    } catch (err) {
      console.error("WithdrawAll error:", err);
      setMessage("❌ Withdraw all error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 zkSync Staking DApp</h2>
      <button onClick={connectWallet}>🔗 Connect Wallet</button>
      <br /><br />
      <input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />
      <button onClick={stake}>🔥 Stake</button>
      <button onClick={claim}>🎁 Claim</button>
      <button onClick={withdraw}>💵 Withdraw</button>
      <button onClick={withdrawAll}>🧹 Withdraw All</button>
      <br /><br />
      <button onClick={refreshBalance}>🔄 Refresh Balance</button>
      <p>{message}</p>
    </div>
  );
}

