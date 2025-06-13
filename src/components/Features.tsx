import React from 'react';
import { Zap, Shield, Globe, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Download videos at maximum speed with our optimized servers'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your downloads are private and secure, no data is stored'
    },
    {
      icon: Globe,
      title: 'Universal Support',
      description: 'Works with most popular video platforms worldwide'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Download videos on any device - desktop, tablet, or mobile'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose VideoDownloader?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          The most reliable and feature-rich video downloader with support for multiple formats and qualities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;