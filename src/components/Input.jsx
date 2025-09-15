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
            border-[#DFDFDF] focus:outline-none focus:ring-0 focus:border-blue-light-1
          `}
        />
        {isPassword && (
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
