import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-16 h-16 border-8 border-t-8 border-amber-400 border-opacity-1 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
