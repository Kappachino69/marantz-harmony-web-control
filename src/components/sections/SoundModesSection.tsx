
import React, { useState } from 'react';
import { SoundModeSelector } from '../SoundModeSelector';
import { EqControl } from '../EqControl';
import { cn } from '@/lib/utils';

interface SoundModesSectionProps {
  className?: string;
}

export const SoundModesSection: React.FC<SoundModesSectionProps> = ({ className }) => {
  const [currentMode, setCurrentMode] = useState('dolby');
  
  return (
    <div className={cn("space-y-10", className)}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display font-semibold">Sound Configuration</h2>
        <p className="text-gray-500 dark:text-gray-400">Customize your audio experience</p>
      </div>
      
      <SoundModeSelector 
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />
      
      <EqControl />
    </div>
  );
};
