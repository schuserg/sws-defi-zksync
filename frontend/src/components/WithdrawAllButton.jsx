// src/components/WithdrawAllButton.jsx

const WithdrawAllButton = ({ onWithdrawAll }) => {
  return (
    <button
      onClick={onWithdrawAll}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded my-2"
    >
      🧹 Withdraw All
    </button>
  );
};

export default WithdrawAllButton;

