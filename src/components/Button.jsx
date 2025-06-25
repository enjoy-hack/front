import React from 'react';

function Button({ label, onClick, disabled, variant = 'default' }) {
  const baseClasses = 'w-full rounded-lg py-3 font-bold transition';

  const variantClasses = {
    default: disabled ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white',
    file: 'border border-blue-400 text-blue-400 bg-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;
