
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { testConnection } from '@/utils/marantzApi';

interface ReceiverContextType {
  ipAddress: string;
  isConnected: boolean;
  setIpAddress: (ip: string) => void;
  checkConnection: () => Promise<boolean>;
}

const ReceiverContext = createContext<ReceiverContextType | undefined>(undefined);

export const useReceiver = () => {
  const context = useContext(ReceiverContext);
  if (context === undefined) {
    throw new Error('useReceiver must be used within a ReceiverProvider');
  }
  return context;
};

interface ReceiverProviderProps {
  children: ReactNode;
}

export const ReceiverProvider: React.FC<ReceiverProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [ipAddress, setIpAddressState] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Load saved IP address on mount
    const savedIp = localStorage.getItem('marantz_ip');
    if (savedIp) {
      setIpAddressState(savedIp);
      checkConnectionWithIp(savedIp);
    }
  }, []);

  const checkConnectionWithIp = async (ip: string): Promise<boolean> => {
    try {
      const connected = await testConnection(ip);
      setIsConnected(connected);
      return connected;
    } catch (error) {
      setIsConnected(false);
      return false;
    }
  };

  const checkConnection = async (): Promise<boolean> => {
    return await checkConnectionWithIp(ipAddress);
  };

  const setIpAddress = (ip: string) => {
    setIpAddressState(ip);
    localStorage.setItem('marantz_ip', ip);
  };

  const value = {
    ipAddress,
    isConnected,
    setIpAddress,
    checkConnection,
  };

  return (
    <ReceiverContext.Provider value={value}>
      {children}
    </ReceiverContext.Provider>
  );
};
