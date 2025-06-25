import React from 'react';

function Avatar({ size = 'w-24 h-24' }) {
  return <div className={`rounded-full bg-gray-300 ${size}`} />;
}

export default Avatar;
