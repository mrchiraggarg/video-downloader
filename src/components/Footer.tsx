import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 bg-white/5 backdrop-blur-md border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">VideoDownloader</h3>
            <p className="text-gray-600 leading-relaxed">
              The most reliable universal video downloader supporting multiple formats and platforms.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Supported sites</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for video enthusiasts</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;