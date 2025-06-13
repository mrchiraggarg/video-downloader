// Video download service using a backend API approach
// Since we can't run yt-dlp directly in the browser, we'll use a proxy service

interface VideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  formats: Array<{
    format_id: string;
    ext: string;
    quality: string;
    filesize?: number;
    url: string;
  }>;
}

interface DownloadRequest {
  url: string;
  format: 'mp3' | 'mp4';
  quality: string;
}

class VideoDownloadService {
  private readonly API_BASE = 'https://api.cobalt.tools'; // Using cobalt.tools as an example
  
  async getVideoInfo(url: string): Promise<VideoInfo | null> {
    try {
      // In a real implementation, you'd call your backend API
      // For now, we'll simulate the response
      const response = await this.makeRequest('/api/json', {
        url: url,
        vCodec: 'h264',
        vQuality: '720',
        aFormat: 'mp3',
        isAudioOnly: false
      });
      
      if (response.status === 'success') {
        return {
          title: response.title || 'Unknown Video',
          duration: response.duration || 0,
          thumbnail: response.thumbnail || '',
          formats: response.formats || []
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching video info:', error);
      return null;
    }
  }
  
  async downloadVideo(request: DownloadRequest): Promise<{ success: boolean; downloadUrl?: string; error?: string }> {
    try {
      const payload = {
        url: request.url,
        vCodec: 'h264',
        vQuality: this.mapQuality(request.quality),
        aFormat: request.format === 'mp3' ? 'mp3' : 'best',
        isAudioOnly: request.format === 'mp3'
      };
      
      const response = await this.makeRequest('/api/json', payload);
      
      if (response.status === 'success' && response.url) {
        // Trigger download
        await this.triggerDownload(response.url, this.generateFilename(request.url, request.format, request.quality));
        return { success: true, downloadUrl: response.url };
      } else {
        return { success: false, error: response.text || 'Download failed' };
      }
    } catch (error) {
      console.error('Download error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }
  
  private async makeRequest(endpoint: string, data: any): Promise<any> {
    // Since we can't actually use external APIs in this demo environment,
    // we'll simulate the API response for demonstration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different responses based on URL patterns
    if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
      return {
        status: 'success',
        title: 'Sample YouTube Video',
        url: this.generateSampleFile(data.isAudioOnly ? 'mp3' : 'mp4'),
        duration: 180,
        thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
      };
    } else if (data.url.includes('tiktok.com')) {
      return {
        status: 'success',
        title: 'Sample TikTok Video',
        url: this.generateSampleFile(data.isAudioOnly ? 'mp3' : 'mp4'),
        duration: 30
      };
    } else {
      return {
        status: 'success',
        title: 'Sample Video',
        url: this.generateSampleFile(data.isAudioOnly ? 'mp3' : 'mp4'),
        duration: 120
      };
    }
  }
  
  private generateSampleFile(format: string): string {
    // Generate a data URL for demonstration
    if (format === 'mp3') {
      // Create a simple audio file
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const sampleRate = 44100;
      const duration = 5; // 5 seconds
      const numSamples = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
      
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < numSamples; i++) {
        // Generate a simple melody
        const frequency = 440 + Math.sin(i / 1000) * 100;
        channelData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
      }
      
      // Convert to WAV and return as data URL
      const wavData = this.audioBufferToWav(buffer);
      const blob = new Blob([wavData], { type: 'audio/wav' });
      return URL.createObjectURL(blob);
    } else {
      // For MP4, we'll create a simple video using Canvas and MediaRecorder
      return this.generateSampleVideo();
    }
  }
  
  private generateSampleVideo(): string {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;
    
    // Create a simple animated video
    const frames: string[] = [];
    for (let frame = 0; frame < 30; frame++) {
      ctx.fillStyle = `hsl(${frame * 12}, 70%, 50%)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'white';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Sample Video', canvas.width / 2, canvas.height / 2);
      ctx.fillText(`Frame ${frame + 1}`, canvas.width / 2, canvas.height / 2 + 60);
      
      frames.push(canvas.toDataURL());
    }
    
    // For demonstration, return a data URL of the last frame as an image
    return frames[frames.length - 1];
  }
  
  private async triggerDownload(url: string, filename: string): Promise<void> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download trigger error:', error);
      throw error;
    }
  }
  
  private mapQuality(quality: string): string {
    const qualityMap: { [key: string]: string } = {
      '1080p': '1080',
      '720p': '720',
      '480p': '480',
      '360p': '360',
      '320kbps': '320',
      '256kbps': '256',
      '128kbps': '128',
      '96kbps': '96'
    };
    return qualityMap[quality] || '720';
  }
  
  private generateFilename(url: string, format: string, quality: string): string {
    const videoId = this.extractVideoId(url);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    if (videoId) {
      return `${videoId}_${quality}.${format}`;
    }
    
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '').replace('.com', '');
      return `${domain}_video_${timestamp}_${quality}.${format}`;
    } catch {
      return `video_${timestamp}_${quality}.${format}`;
    }
  }
  
  private extractVideoId(url: string): string | null {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) return youtubeMatch[1];
    
    // TikTok
    const tiktokRegex = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
    const tiktokMatch = url.match(tiktokRegex);
    if (tiktokMatch) return tiktokMatch[1];
    
    // Instagram
    const instagramRegex = /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
    const instagramMatch = url.match(instagramRegex);
    if (instagramMatch) return instagramMatch[1];
    
    return null;
  }
  
  private audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
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
}

export const videoDownloadService = new VideoDownloadService();
export type { VideoInfo, DownloadRequest };