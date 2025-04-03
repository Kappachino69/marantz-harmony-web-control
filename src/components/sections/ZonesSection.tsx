
import React from 'react';
import { ZoneControl } from '../ZoneControl';
import { cn } from '@/lib/utils';

interface ZonesSectionProps {
  className?: string;
}

export const ZonesSection: React.FC<ZonesSectionProps> = ({ className }) => {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-display font-semibold">Multi-Zone Control</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage audio in different rooms</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZoneControl zoneName="Zone 2" />
        <ZoneControl zoneName="Zone 3" />
      </div>
    </div>
  );
};
