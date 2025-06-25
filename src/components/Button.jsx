import React from 'react';

function Button({
  label,
  onClick,
  disabled,
  variant = 'default',
  isSelected = false,
}) {
  const baseClasses = 'w-full rounded-lg py-3 font-bold transition';

  const variantClasses = {
    default: disabled ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white',
    file: 'border border-blue-400 text-blue-400 bg-white',
    track: isSelected
      ? 'bg-blue-600 text-white border border-blue-600 rounded-full px-3 py-2'
      : 'bg-white text-blue-500 border border-blue-300 rounded-full px-3 py-2',
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
