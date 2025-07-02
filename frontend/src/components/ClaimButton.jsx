// src/components/ClaimButton.jsx

const ClaimButton = ({ onClaim }) => {
  return (
    <button
      onClick={onClaim}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded my-2"
    >
      🎁 Claim
    </button>
  );
};

export default ClaimButton;

