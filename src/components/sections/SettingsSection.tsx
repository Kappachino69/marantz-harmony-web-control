import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SettingsSectionProps {
  className?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ className }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    autoStandby: true,
    ecoMode: false,
    screenTimeout: 30,
    hdmiControl: true,
    networkStandby: true,
    bluetoothStandby: false
  });
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
  
  const handleSliderChange = (value: number[]) => {
    setSettings({
      ...settings,
      screenTimeout: value[0]
    });
  };
  
  const saveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated",
      variant: "default"
    });
  };
  
  const resetSettings = () => {
    setSettings({
      autoStandby: true,
      ecoMode: false,
      screenTimeout: 30,
      hdmiControl: true,
      networkStandby: true,
      bluetoothStandby: false
    });
    
    toast({
      title: "Settings reset",
      description: "Settings have been restored to defaults",
      variant: "default"
    });
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display font-semibold">System Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Configure your receiver preferences</p>
      </div>
      
      <div className="bg-white dark:bg-marantz-dark rounded-xl shadow-md p-6 space-y-6">
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => {
            if (key === 'screenTimeout') return null;
            
            return (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">{
                    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                  }</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getSettingDescription(key as keyof typeof settings)}
                  </p>
                </div>
                <Switch 
                  checked={value as boolean} 
                  onCheckedChange={() => handleToggle(key as keyof typeof settings)} 
                />
              </div>
            );
          })}
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-base font-medium">Screen Timeout</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Time before display turns off (in seconds)
                </p>
              </div>
              <span className="font-medium">{settings.screenTimeout}s</span>
            </div>
            <Slider 
              defaultValue={[settings.screenTimeout]} 
              max={120}
              min={10}
              step={5}
              onValueChange={handleSliderChange}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button 
            variant="outline" 
            onClick={resetSettings}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Reset
          </Button>
          <Button 
            onClick={saveSettings}
            className="flex items-center gap-2 bg-marantz-accent hover:bg-marantz-accent/90"
          >
            <Save size={16} />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

function getSettingDescription(setting: string): string {
  const descriptions: Record<string, string> = {
    autoStandby: "Automatically turn off after period of inactivity",
    ecoMode: "Reduce power consumption when in use",
    hdmiControl: "Allow controlling receiver via HDMI-CEC",
    networkStandby: "Enable wake-up over network connection",
    bluetoothStandby: "Enable wake-up over Bluetooth connection"
  };
  
  return descriptions[setting] || "";
}
