
import React, { useState } from 'react';
import { VolumeControl } from './VolumeControl';
import { SourceSelector } from './SourceSelector';
import { PowerControl } from './PowerControl';
import { cn } from '@/lib/utils';

interface ZoneControlProps {
  zoneName: string;
  className?: string;
}

export const ZoneControl: React.FC<ZoneControlProps> = ({
  zoneName,
  className
}) => {
  const [isOn, setIsOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30);
  const [source, setSource] = useState('tv');
  
  const handlePowerToggle = () => {
    setIsOn(!isOn);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };
  
  const handleSourceChange = (newSource: string) => {
    setSource(newSource);
  };
  
  return (
    <div className={cn(
      "zone-card",
      isOn ? "opacity-100" : "opacity-80",
      className
    )}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold">{zoneName}</h3>
        <PowerControl isOn={isOn} onToggle={handlePowerToggle} />
      </div>
      
      {isOn && (
        <div className="space-y-6">
          <VolumeControl
            initialVolume={volume}
            onVolumeChange={handleVolumeChange}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
          />
          
          <SourceSelector
            currentSource={source}
            onSourceChange={handleSourceChange}
          />
        </div>
      )}
    </div>
  );
};
