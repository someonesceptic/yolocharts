import { useState } from 'react';

const TipBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 w-full p-4 bg-blue-500 text-white flex items-center justify-between shadow-lg">
      <span>Enjoying free, ad-free financial data? Consider leaving a tip to help us keep it this way!</span>
      <div className="flex space-x-2">
        <button 
          onClick={() => alert('Tip process here!')}
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-50 transition-colors"
        >
          Leave a Tip
        </button>
        <button 
          onClick={() => setVisible(false)}
          className="px-4 py-2 bg-transparent text-white border border-white rounded hover:bg-blue-400 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default TipBanner;