import React from 'react';
import { Download } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Download className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VideoDownloader
            </h1>
            <p className="text-gray-600 text-sm">Universal media downloader</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;