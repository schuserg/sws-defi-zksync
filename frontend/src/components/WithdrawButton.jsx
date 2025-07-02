// src/components/WithdrawButton.jsx

const WithdrawButton = ({ onWithdraw }) => {
  return (
    <button
      onClick={onWithdraw}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded my-2"
    >
      💵 Withdraw
    </button>
  );
};

export default WithdrawButton;

