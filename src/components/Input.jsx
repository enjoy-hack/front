import React, { useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

function Input({ type = 'text', placeholder, value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isSearch = type === 'search';

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-3 border rounded-md outline-none transition
            border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200
          `}
        />
        {isPassword && (
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
        {isSearch && (
          <div className="absolute right-3 top-3 pointer-events-none">
            <Search size={20} />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default Input;
