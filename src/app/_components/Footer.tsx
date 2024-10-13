import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-t border-gray-700 mt-[30px] py-[40px] text-center">
        <p className="text-[12px] text-gray-500">© {new Date().getFullYear()} SafeKeep. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
