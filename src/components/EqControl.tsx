
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface EqControlProps {
  className?: string;
}

interface EqSetting {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
}

export const EqControl: React.FC<EqControlProps> = ({ className }) => {
  const [eqSettings, setEqSettings] = useState<EqSetting[]>([
    { id: 'bass', label: 'Bass', value: 0, min: -10, max: 10 },
    { id: 'treble', label: 'Treble', value: 0, min: -10, max: 10 },
    { id: 'balance', label: 'Balance', value: 0, min: -10, max: 10 },
    { id: 'subwoofer', label: 'Subwoofer', value: 0, min: -10, max: 10 },
  ]);
  
  const handleEqChange = (id: string, value: number) => {
    setEqSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    );
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Audio Adjustments</h3>
      
      <div className="space-y-6">
        {eqSettings.map((setting) => {
          const percentage = ((setting.value - setting.min) / (setting.max - setting.min)) * 100;
          
          return (
            <div key={setting.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{setting.label}</label>
                <span className="text-sm">{setting.value}</span>
              </div>
              
              <div className="relative h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "absolute h-full top-0 transition-all duration-300",
                    setting.id === 'balance' ? 
                      "bg-gradient-to-r from-blue-500 to-green-500" : 
                      "bg-marantz-accent"
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    left: setting.id === 'balance' ? `${50 - percentage/2}%` : '0%'
                  }}
                />
              </div>
              
              <input
                type="range"
                min={setting.min}
                max={setting.max}
                step={1}
                value={setting.value}
                onChange={(e) => handleEqChange(setting.id, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
