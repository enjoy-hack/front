import React from 'react';

function Button({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg py-3 text-white font-bold transition ${
        disabled ? 'bg-gray-300' : 'bg-blue-600'
      }`}
    >
      {label}
    </button>
  );
}

export default Button;
