import React from 'react';

const Avatar = ({ name, size = 'large' }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name) => {
    const colors = [
      'from-red-500 to-pink-500',
      'from-orange-500 to-amber-500',
      'from-yellow-500 to-orange-500',
      'from-green-500 to-emerald-500',
      'from-teal-500 to-cyan-500',
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-pink-500 to-rose-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-16 h-16 text-xl',
    large: 'w-24 h-24 text-3xl',
    xlarge: 'w-32 h-32 text-4xl'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getColorFromName(name)} flex items-center justify-center text-white font-bold shadow-lg`}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;