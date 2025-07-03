'use client';

import { useEffect, useRef, useState } from 'react';

interface AvatarProps {
  isThinking?: boolean;
  isTalking?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Avatar({ isThinking, isTalking, size = 'medium' }: AvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  
  // Detect iOS/Safari for fallback
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Use static image for iOS/Safari if video issues
    if (isIOS || isSafari) {
      // Test if video can actually play
      const testVideo = document.createElement('video');
      testVideo.src = '/quin.mp4';
      testVideo.play().catch(() => {
        setIsVideoSupported(false);
      });
    }
  }, []);
  
  // Control video playback based on state
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Check if video is still in the DOM before playing
      if (document.contains(video)) {
        if (isTalking || isThinking) {
          video.playbackRate = isTalking ? 1.2 : 0.8;
          video.play().catch(() => {
            // Silently handle play errors
          });
        } else {
          // Slow idle animation
          video.playbackRate = 0.5;
          video.play().catch(() => {
            // Silently handle play errors
          });
        }
      }
    }
  }, [isTalking, isThinking]);
  
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Thinking indicator */}
      {isThinking && (
        <div className="absolute -top-2 -right-2">
          <div className="flex space-x-1">
            <span className="animate-bounce delay-0 h-2 w-2 bg-blue-500 rounded-full" />
            <span className="animate-bounce delay-100 h-2 w-2 bg-blue-500 rounded-full" />
            <span className="animate-bounce delay-200 h-2 w-2 bg-blue-500 rounded-full" />
          </div>
        </div>
      )}
      
      {/* Avatar */}
      {isVideoSupported ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-full"
          loop
          muted
          playsInline
          autoPlay
          onError={() => setIsVideoSupported(false)}
        >
          <source src="/quin.webm" type="video/webm" />
          <source src="/quin.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/quin-static.png"
          alt="Quin's Avatar"
          className="w-full h-full object-cover rounded-full"
        />
      )}
      
      {/* Talking indicator */}
      {isTalking && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 h-1 animate-pulse rounded-full" 
               style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
}