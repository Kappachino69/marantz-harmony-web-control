
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wifi, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { testConnection } from '@/utils/marantzApi';

interface ConnectionFormProps {
  className?: string;
}

export const ConnectionForm: React.FC<ConnectionFormProps> = ({ className }) => {
  const { toast } = useToast();
  const [ipAddress, setIpAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Load saved IP address on component mount
  useEffect(() => {
    const savedIp = localStorage.getItem('marantz_ip');
    if (savedIp) {
      setIpAddress(savedIp);
      checkConnection(savedIp);
    }
  }, []);
  
  const checkConnection = async (ip: string) => {
    setIsConnecting(true);
    try {
      const connected = await testConnection(ip);
      setIsConnected(connected);
      
      if (connected) {
        toast({
          title: "Connection Successful",
          description: `Connected to Marantz receiver at ${ip}`,
          variant: "default"
        });
      }
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleSaveConnection = async () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Invalid IP Address",
        description: "Please enter a valid IP address",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const connected = await testConnection(ipAddress);
      
      if (connected) {
        // Save to localStorage
        localStorage.setItem('marantz_ip', ipAddress);
        setIsConnected(true);
        
        toast({
          title: "Connection Saved",
          description: `Successfully connected to ${ipAddress}`,
          variant: "default"
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to the receiver at this address",
          variant: "destructive"
        });
        setIsConnected(false);
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect to the receiver",
        variant: "destructive"
      });
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Wifi size={16} 
              className={isConnected ? "text-green-500" : "text-gray-400"} 
            />
            <span className="text-sm font-medium">
              {isConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
          <Input
            type="text"
            placeholder="Enter receiver IP address (e.g. 192.168.1.100)"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="w-full"
          />
        </div>
        <Button
          onClick={handleSaveConnection}
          disabled={isConnecting}
          className="bg-marantz-accent hover:bg-marantz-accent/90"
        >
          <Save size={16} className="mr-2" />
          {isConnecting ? "Connecting..." : "Save Connection"}
        </Button>
      </div>
    </div>
  );
};
