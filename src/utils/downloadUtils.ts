// Utility functions for handling downloads

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateSampleFile = (format: string, quality: string): Blob => {
  if (format === 'mp3') {
    // Generate a simple audio file (silent audio)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = 44100;
    const duration = 10; // 10 seconds
    const numSamples = sampleRate * duration;
    const buffer = audioContext.createBuffer(2, numSamples, sampleRate);
    
    // Create a simple tone
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < numSamples; i++) {
        channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1; // 440Hz tone at low volume
      }
    }
    
    // Convert to WAV format (simplified)
    const wavData = audioBufferToWav(buffer);
    return new Blob([wavData], { type: 'audio/wav' });
  } else {
    // For MP4, create a simple text file as placeholder
    const content = `Sample video file - ${quality} quality\nThis is a demonstration file.\nIn a real implementation, this would be the actual video content.`;
    return new Blob([content], { type: 'text/plain' });
  }
};

// Simplified WAV file creation
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const length = buffer.length;
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);
  
  // Convert float samples to 16-bit PCM
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return arrayBuffer;
}

export const extractVideoId = (url: string): string | null => {
  // YouTube URL patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

export const getVideoTitle = (url: string): string => {
  const videoId = extractVideoId(url);
  if (videoId) {
    return `video_${videoId}`;
  }
  
  // Extract domain name for other URLs
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    return `video_${domain}_${Date.now()}`;
  } catch {
    return `video_${Date.now()}`;
  }
};