'use client';

import { useEffect, useState } from 'react';

interface AnimatedAvatarProps {
  isThinking?: boolean;
  isTalking?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function AnimatedAvatar({ isThinking, isTalking, size = 'medium' }: AnimatedAvatarProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const totalFrames = 220;
  
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32'
  };
  
  // Control animation speed based on state
  useEffect(() => {
    if (!isAnimating) return;
    
    let animationSpeed = 150; // Default idle speed (ms)
    
    if (isTalking) {
      animationSpeed = 50; // Fast animation when talking
    } else if (isThinking) {
      animationSpeed = 200; // Slower when thinking
    }
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev >= totalFrames ? 1 : prev + 1));
    }, animationSpeed);
    
    return () => clearInterval(interval);
  }, [isTalking, isThinking, isAnimating, totalFrames]);
  
  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Thinking indicator */}
      {isThinking && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex space-x-1">
            <span className="animate-bounce delay-0 h-2 w-2 bg-blue-500 rounded-full" />
            <span className="animate-bounce delay-100 h-2 w-2 bg-blue-500 rounded-full" />
            <span className="animate-bounce delay-200 h-2 w-2 bg-blue-500 rounded-full" />
          </div>
        </div>
      )}
      
      {/* Animated Avatar */}
      <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={`/frames/frame_${currentFrame.toString().padStart(4, '0')}.png`}
          alt="Quin's Avatar"
          className="w-full h-full object-cover"
          onError={() => {
            // Fallback to static image if frame doesn't load
            setIsAnimating(false);
          }}
        />
      </div>
      
      {/* Talking indicator */}
      {isTalking && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-green-500 h-1 animate-pulse rounded-full" 
               style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
}