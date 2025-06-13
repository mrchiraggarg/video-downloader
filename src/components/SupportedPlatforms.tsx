import React from 'react';
import { Play, Music2, Video, Radio } from 'lucide-react';

const SupportedPlatforms = () => {
  const platforms = [
    { name: 'YouTube', icon: Play, color: 'from-red-500 to-red-600' },
    { name: 'TikTok', icon: Music2, color: 'from-pink-500 to-purple-600' },
    { name: 'Instagram', icon: Video, color: 'from-purple-500 to-pink-500' },
    { name: 'Facebook', icon: Video, color: 'from-blue-500 to-blue-600' },
    { name: 'Twitter', icon: Radio, color: 'from-blue-400 to-blue-500' },
    { name: 'Vimeo', icon: Play, color: 'from-cyan-500 to-blue-500' },
    { name: 'Dailymotion', icon: Video, color: 'from-orange-500 to-red-500' },
    { name: 'And More...', icon: Video, color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Supported Platforms
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Download videos from your favorite platforms with just one click.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <div className={`bg-gradient-to-br ${platform.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
              <platform.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {platform.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedPlatforms;