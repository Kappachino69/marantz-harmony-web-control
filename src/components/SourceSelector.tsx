
import React from 'react';
import { Tv, Radio, Disc, Music, MonitorPlay, Gamepad2, Laptop, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReceiver } from '@/contexts/ReceiverContext';
import { setSource } from '@/utils/marantzApi';
import { useToast } from '@/hooks/use-toast';

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
  { id: 'game', label: 'Game', icon: <Gamepad2 size={20} /> },
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
  const { ipAddress, isConnected } = useReceiver();
  const { toast } = useToast();
  
  const handleSourceChange = async (sourceId: string) => {
    if (!isConnected || !ipAddress) {
      toast({
        title: "Not Connected",
        description: "Please connect to your receiver first",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const success = await setSource(ipAddress, sourceId);
      
      if (success) {
        onSourceChange(sourceId);
      } else {
        toast({
          title: "Source Change Failed",
          description: "Could not change input source",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Command Error",
        description: "An error occurred while sending the command",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Input Source</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => handleSourceChange(source.id)}
            disabled={!isConnected}
            className={cn(
              "source-button flex flex-col items-center justify-center py-4 gap-2 transition-all duration-200",
              currentSource === source.id 
                ? "bg-marantz-accent text-white" 
                : "bg-marantz-dark text-white hover:bg-marantz-slate",
              !isConnected && "opacity-50 cursor-not-allowed"
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
