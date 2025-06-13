import React, { useState } from 'react';
import { Download, Link, Music, Video, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface DownloadFormProps {
  onDownload: (url: string, format: string, quality: string) => void;
  isLoading: boolean;
  downloadStatus: 'idle' | 'processing' | 'success' | 'error';
}

const DownloadForm: React.FC<DownloadFormProps> = ({ onDownload, isLoading, downloadStatus }) => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('720p');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onDownload(url.trim(), format, quality);
    }
  };

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or any video URL"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Format Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('mp4')}
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    format === 'mp4'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span className="font-medium">MP4</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('mp3')}
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    format === 'mp3'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Music className="w-5 h-5" />
                  <span className="font-medium">MP3</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
              >
                {format === 'mp4' ? (
                  <>
                    <option value="1080p">1080p (Full HD)</option>
                    <option value="720p">720p (HD)</option>
                    <option value="480p">480p (SD)</option>
                    <option value="360p">360p</option>
                  </>
                ) : (
                  <>
                    <option value="320kbps">320 kbps (High)</option>
                    <option value="256kbps">256 kbps (Good)</option>
                    <option value="128kbps">128 kbps (Standard)</option>
                    <option value="96kbps">96 kbps (Low)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Download Button */}
          <button
            type="submit"
            disabled={!url.trim() || !isValidUrl(url) || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download {format.toUpperCase()}</span>
              </>
            )}
          </button>

          {/* Status Messages */}
          {downloadStatus === 'success' && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 py-3 px-4 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Download started! Check your downloads folder.</span>
            </div>
          )}

          {downloadStatus === 'error' && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 py-3 px-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>Download failed. Please check the URL and try again.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DownloadForm;