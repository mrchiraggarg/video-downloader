import { useState } from 'react';
import Header from './components/Header';
import DownloadForm from './components/DownloadForm';
import Features from './components/Features';
import SupportedPlatforms from './components/SupportedPlatforms';
import Footer from './components/Footer';
import { videoDownloadService } from './services/videoDownloadService';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDownload = async (url: string, format: string, quality: string) => {
    setIsLoading(true);
    setDownloadStatus('processing');
    setErrorMessage('');

    try {
      // Validate URL
      if (!isValidVideoUrl(url)) {
        throw new Error('Please enter a valid video URL from a supported platform');
      }

      // Attempt to download the video
      const result = await videoDownloadService.downloadVideo({
        url: url.trim(),
        format: format as 'mp3' | 'mp4',
        quality
      });

      if (result.success) {
        setDownloadStatus('success');
      } else {
        throw new Error(result.error || 'Download failed');
      }
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Download error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setDownloadStatus('error');
      setTimeout(() => {
        setDownloadStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidVideoUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const supportedDomains = [
        'youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com',
        'facebook.com', 'twitter.com', 'x.com', 'vimeo.com',
        'dailymotion.com', 'twitch.tv'
      ];
      
      return supportedDomains.some(domain => 
        urlObj.hostname.includes(domain) || urlObj.hostname.includes(`www.${domain}`)
      );
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Download Videos
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Instantly
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Convert and download videos from any platform in MP3 or MP4 format. 
              Fast, free, and works on all devices.
            </p>
          </div>

          {/* Download Form */}
          <div className="mb-20">
            <DownloadForm 
              onDownload={handleDownload}
              isLoading={isLoading}
              downloadStatus={downloadStatus}
              errorMessage={errorMessage}
            />
          </div>

          {/* Features Section */}
          <Features />

          {/* Supported Platforms */}
          <SupportedPlatforms />

          {/* Legal Notice */}
          <div className="max-w-4xl mx-auto mt-16 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Notice</h3>
            <p className="text-yellow-700 text-sm leading-relaxed">
              This tool is for educational purposes. Please respect copyright laws and platform terms of service. 
              Only download content you have permission to download or that is in the public domain.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;