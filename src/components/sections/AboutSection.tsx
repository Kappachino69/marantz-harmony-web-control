
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, HelpCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display font-semibold">About Your Receiver</h2>
        <p className="text-gray-500 dark:text-gray-400">Marantz SR6009 Information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-marantz-dark rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Device Information</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Model</span>
              <span className="font-medium">Marantz SR6009</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Serial Number</span>
              <span className="font-medium">SR6009001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Firmware Version</span>
              <span className="font-medium">2.0.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">IP Address</span>
              <span className="font-medium">192.168.1.100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">MAC Address</span>
              <span className="font-medium">00:11:22:33:44:55</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-marantz-dark rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Power Output</span>
              <span className="font-medium">110W per channel (8 ohms)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">HDMI Inputs</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">HDMI Outputs</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Audio Formats</span>
              <span className="font-medium">Dolby Atmos, DTS:X, Auro-3D</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Multi-room</span>
              <span className="font-medium">3 zones</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <FileText size={18} />
          User Manual
        </Button>
        <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
          <HelpCircle size={18} />
          Support
        </Button>
        <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
          <Send size={18} />
          Contact Marantz
        </Button>
      </div>
    </div>
  );
};
