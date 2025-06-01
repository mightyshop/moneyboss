import React from 'react';
import ChatCard from './ChatCard';
import CashoutStats from './CashoutStats';

function MainApp() {
  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center p-4 font-sans">
      <ChatCard />
      <CashoutStats />
    </div>
  );
}

export default MainApp;