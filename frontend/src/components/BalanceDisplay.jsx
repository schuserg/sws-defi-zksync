// src/components/BalanceDisplay.jsx

const BalanceDisplay = ({ balance, onRefresh }) => {
  return (
    <div className="my-4">
      <p className="mb-2 font-medium">Your staked balance: <span className="font-bold">{balance} SWST</span></p>
      <button
        onClick={onRefresh}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        🔄 Refresh Balance
      </button>
    </div>
  );
};

export default BalanceDisplay;

