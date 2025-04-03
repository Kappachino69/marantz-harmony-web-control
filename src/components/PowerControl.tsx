
import React, { useState } from 'react';
import { Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReceiver } from '@/contexts/ReceiverContext';
import { setPowerState } from '@/utils/marantzApi';
import { useToast } from '@/hooks/use-toast';

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
  const { ipAddress, isConnected } = useReceiver();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleToggle = async () => {
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
      const success = await setPowerState(ipAddress, !isOn);
      
      if (success) {
        onToggle();
      } else {
        toast({
          title: "Command Failed",
          description: "Could not change power state",
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

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <button
        onClick={handleToggle}
        disabled={isProcessing || !isConnected}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isOn 
            ? "bg-marantz-accent text-white shadow-lg shadow-marantz-accent/50" 
            : "bg-marantz-dark text-white opacity-80",
          (!isConnected || isProcessing) && "opacity-50 cursor-not-allowed"
        )}
      >
        <Power size={24} className={isProcessing ? "animate-pulse" : ""} />
      </button>
      
      <div className="mt-2 flex items-center gap-2">
        <div className={cn(
          "indicator-light transition-all duration-300",
          isOn ? "bg-marantz-indicator animate-pulse-light" : "bg-gray-400"
        )} />
        <span className="text-sm font-medium">
          {isProcessing ? "PROCESSING" : (isOn ? "ON" : "STANDBY")}
        </span>
      </div>
    </div>
  );
};
