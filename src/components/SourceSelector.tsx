
import React from 'react';
import { Tv, Radio, Disc, Music, MonitorPlay, Game, Laptop, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SourceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SourceSelectorProps {
  currentSource: string;
  onSourceChange: (source: string) => void;
  className?: string;
}

const sources: SourceOption[] = [
  { id: 'tv', label: 'TV', icon: <Tv size={20} /> },
  { id: 'cd', label: 'CD', icon: <Disc size={20} /> },
  { id: 'bluray', label: 'Blu-ray', icon: <MonitorPlay size={20} /> },
  { id: 'game', label: 'Game', icon: <Game size={20} /> },
  { id: 'media', label: 'Media Player', icon: <Music size={20} /> },
  { id: 'pc', label: 'PC', icon: <Laptop size={20} /> },
  { id: 'tuner', label: 'Tuner', icon: <Radio size={20} /> },
  { id: 'aux', label: 'AUX', icon: <Mic size={20} /> },
];

export const SourceSelector: React.FC<SourceSelectorProps> = ({
  currentSource,
  onSourceChange,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Input Source</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => onSourceChange(source.id)}
            className={cn(
              "source-button flex flex-col items-center justify-center py-4 gap-2 transition-all duration-200",
              currentSource === source.id 
                ? "bg-marantz-accent text-white" 
                : "bg-marantz-dark text-white hover:bg-marantz-slate"
            )}
          >
            {source.icon}
            <span className="text-sm">{source.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
