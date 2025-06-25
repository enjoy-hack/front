import React from 'react';

function Chip({ label, variant = 'blue', onClick }) {
  const baseStyle = 'px-1 py-1 rounded-full text-xs transition';
  const variantStyle =
    variant === 'yellow'
      ? 'bg-yellow-300 text-blue-800'
      : 'bg-blue-600 text-white';

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {label}
    </button>
  );
}

export default Chip;
