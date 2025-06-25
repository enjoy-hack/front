import React from 'react';

function Character({ size = 'w-24 h-24' }) {
  return (
    <div className={`${size} rounded-full overflow-hidden`}>
      <img
        src="/character.png"
        alt="character"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Character;
