
import React from 'react';
import { Power } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PowerControlProps {
  isOn: boolean;
  onToggle: () => void;
  className?: string;
}

export const PowerControl: React.FC<PowerControlProps> = ({
  isOn,
  onToggle,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <button
        onClick={onToggle}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isOn 
            ? "bg-marantz-accent text-white shadow-lg shadow-marantz-accent/50" 
            : "bg-marantz-dark text-white opacity-80"
        )}
      >
        <Power size={24} />
      </button>
      
      <div className="mt-2 flex items-center gap-2">
        <div className={cn(
          "indicator-light transition-all duration-300",
          isOn ? "bg-marantz-indicator animate-pulse-light" : "bg-gray-400"
        )} />
        <span className="text-sm font-medium">
          {isOn ? "ON" : "STANDBY"}
        </span>
      </div>
    </div>
  );
};
