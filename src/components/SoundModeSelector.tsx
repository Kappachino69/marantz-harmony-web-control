
import React from 'react';
import { cn } from '@/lib/utils';

interface SoundModeOption {
  id: string;
  label: string;
  description: string;
}

interface SoundModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
  className?: string;
}

const soundModes: SoundModeOption[] = [
  { 
    id: 'direct', 
    label: 'Direct', 
    description: 'Bypasses tone controls for purest sound reproduction'
  },
  { 
    id: 'stereo', 
    label: 'Stereo', 
    description: 'Standard 2-channel playback'
  },
  { 
    id: 'dolby', 
    label: 'Dolby Surround', 
    description: 'Creates surround sound field from any source'
  },
  { 
    id: 'dts', 
    label: 'DTS Neural:X', 
    description: 'Creates expanded surround sound from any source'
  },
  { 
    id: 'multi', 
    label: 'Multi Ch Stereo', 
    description: 'Stereo sound from all speakers'
  },
  { 
    id: 'movie', 
    label: 'Movie', 
    description: 'Optimized for film content'
  },
  { 
    id: 'music', 
    label: 'Music', 
    description: 'Enhanced for music playback'
  },
  { 
    id: 'game', 
    label: 'Game', 
    description: 'Optimized for video games'
  }
];

export const SoundModeSelector: React.FC<SoundModeSelectorProps> = ({
  currentMode,
  onModeChange,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Sound Mode</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {soundModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={cn(
              "flex flex-col items-start text-left p-4 rounded-lg transition-all duration-200 border",
              currentMode === mode.id 
                ? "bg-marantz-accent text-white border-marantz-accent" 
                : "bg-white dark:bg-marantz-dark text-gray-800 dark:text-white border-gray-200 dark:border-gray-800 hover:border-marantz-accent"
            )}
          >
            <span className="text-base font-medium">{mode.label}</span>
            <span className={cn(
              "text-xs mt-1",
              currentMode === mode.id 
                ? "text-white/80" 
                : "text-gray-500 dark:text-gray-400"
            )}>
              {mode.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
