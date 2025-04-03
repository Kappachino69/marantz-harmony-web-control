
import React, { useState } from 'react';
import { VolumeControl } from '../VolumeControl';
import { SourceSelector } from '../SourceSelector';
import { PowerControl } from '../PowerControl';
import { SoundModeSelector } from '../SoundModeSelector';
import { cn } from '@/lib/utils';

interface MainSectionProps {
  className?: string;
}

export const MainSection: React.FC<MainSectionProps> = ({ className }) => {
  const [isOn, setIsOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(42);
  const [source, setSource] = useState('bluray');
  const [soundMode, setSoundMode] = useState('dolby');

  // Sound wave animation for active source
  const SoundWaveAnimation = () => (
    <div className="sound-wave">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="sound-wave-bar" 
          style={{ 
            height: `${Math.max(8, Math.random() * 20)}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
  
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold mb-2">Main Zone</h2>
        {isOn && !isMuted && <SoundWaveAnimation />}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <PowerControl 
            isOn={isOn} 
            onToggle={() => setIsOn(!isOn)} 
            className="mb-8"
          />
          
          {isOn && (
            <VolumeControl
              initialVolume={volume}
              onVolumeChange={setVolume}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
            />
          )}
        </div>
        
        {isOn && (
          <div className="space-y-8">
            <SourceSelector
              currentSource={source}
              onSourceChange={setSource}
            />
            
            <SoundModeSelector
              currentMode={soundMode}
              onModeChange={setSoundMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
