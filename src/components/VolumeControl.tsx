
import React, { useState, useEffect, useRef } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VolumeControlProps {
  initialVolume?: number;
  onVolumeChange?: (volume: number) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  initialVolume = 40,
  onVolumeChange,
  isMuted = false,
  onMuteToggle,
  className
}) => {
  const [volume, setVolume] = useState(initialVolume);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVolume(initialVolume);
  }, [initialVolume]);

  const handleVolumeChange = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, newVolume));
    setVolume(clampedVolume);
    onVolumeChange?.(clampedVolume);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="text-gray-500" />;
    if (volume < 30) return <Volume />;
    if (volume < 70) return <Volume1 />;
    return <Volume2 />;
  };

  // Handle knob rotation effect
  const handleKnobInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    const knob = knobRef.current;
    if (!knob) return;

    const knobRect = knob.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate angle in radians
    const angleRad = Math.atan2(mouseY - knobCenterY, mouseX - knobCenterX);
    // Convert to degrees and normalize to 0-360
    const angleDeg = (angleRad * 180 / Math.PI + 90) % 360;
    
    // Map angle to volume (0-100)
    const newVolume = Math.round((angleDeg / 360) * 100);
    handleVolumeChange(newVolume);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        ref={knobRef}
        className="control-knob mb-4"
        onClick={handleKnobInteraction}
        style={{ transform: isMuted ? 'scale(0.95)' : 'scale(1)' }}
      >
        <div 
          className="control-knob-inner"
          style={{ transform: `rotate(${(volume / 100) * 270}deg)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "text-3xl font-semibold transition-colors",
            isMuted ? "text-gray-500" : "text-marantz-dark"
          )}>
            {isMuted ? "MUTE" : volume}
          </span>
        </div>
      </div>
      
      <div className="w-full max-w-xs flex items-center gap-3">
        <button
          onClick={onMuteToggle}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {getVolumeIcon()}
        </button>
        
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
};
