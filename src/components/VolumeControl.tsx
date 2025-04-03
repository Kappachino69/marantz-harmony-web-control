
import React, { useState, useEffect, useRef } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReceiver } from '@/contexts/ReceiverContext';
import { setVolume, setMute } from '@/utils/marantzApi';
import { useToast } from '@/hooks/use-toast';

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
  const { ipAddress, isConnected } = useReceiver();
  const { toast } = useToast();
  const [volume, setVolumeState] = useState(initialVolume);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVolumeState(initialVolume);
  }, [initialVolume]);

  const handleVolumeChange = async (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(98, newVolume));
    setVolumeState(clampedVolume);
    
    if (onVolumeChange) {
      onVolumeChange(clampedVolume);
    }
    
    if (!isConnected || !ipAddress) {
      return;
    }
    
    try {
      await setVolume(ipAddress, clampedVolume);
    } catch (error) {
      toast({
        title: "Volume Control Error",
        description: "Failed to set volume on receiver",
        variant: "destructive"
      });
    }
  };
  
  const handleMuteToggle = async () => {
    if (!isConnected || !ipAddress) {
      toast({
        title: "Not Connected",
        description: "Please connect to your receiver first",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const success = await setMute(ipAddress, !isMuted);
      
      if (success && onMuteToggle) {
        onMuteToggle();
      } else if (!success) {
        toast({
          title: "Command Failed",
          description: "Could not change mute state",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Command Error",
        description: "An error occurred while sending the command",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className={isProcessing ? "animate-pulse text-gray-500" : "text-gray-500"} />;
    if (volume < 30) return <Volume className={isProcessing ? "animate-pulse" : ""} />;
    if (volume < 70) return <Volume1 className={isProcessing ? "animate-pulse" : ""} />;
    return <Volume2 className={isProcessing ? "animate-pulse" : ""} />;
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
    
    // Map angle to volume (0-98 for Marantz)
    const newVolume = Math.round((angleDeg / 360) * 98);
    handleVolumeChange(newVolume);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        ref={knobRef}
        className={cn(
          "control-knob mb-4",
          !isConnected && "opacity-70 cursor-not-allowed"
        )}
        onClick={isConnected ? handleKnobInteraction : undefined}
        style={{ transform: isMuted ? 'scale(0.95)' : 'scale(1)' }}
      >
        <div 
          className="control-knob-inner"
          style={{ transform: `rotate(${(volume / 98) * 270}deg)` }}
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
          onClick={handleMuteToggle}
          disabled={isProcessing || !isConnected}
          className={cn(
            "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors",
            (!isConnected || isProcessing) && "opacity-50 cursor-not-allowed"
          )}
        >
          {getVolumeIcon()}
        </button>
        
        <input
          type="range"
          min="0"
          max="98"
          value={volume}
          onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
          disabled={!isConnected}
          className={cn(
            "flex-1",
            !isConnected && "opacity-70 cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
};
