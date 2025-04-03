
import React from 'react';
import { Home, Radio, Settings, Volume2, Music, Tv2, PlaySquare, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sidebarLinks = [
  { icon: <Home size={20} />, label: 'Main', id: 'main' },
  { icon: <Volume2 size={20} />, label: 'Zones', id: 'zones' },
  { icon: <Music size={20} />, label: 'Sound Modes', id: 'sound-modes' },
  { icon: <Tv2 size={20} />, label: 'Video', id: 'video' },
  { icon: <Radio size={20} />, label: 'Tuner', id: 'tuner' },
  { icon: <PlaySquare size={20} />, label: 'Media', id: 'media' },
  { icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  { icon: <Info size={20} />, label: 'About', id: 'about' }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeSection, 
  setActiveSection 
}) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-marantz-silver dark:bg-marantz-dark shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-display font-semibold text-marantz-dark dark:text-white">
              SR6009 Controller
            </h2>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveSection(link.id);
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors",
                      activeSection === link.id 
                        ? "bg-marantz-accent text-white" 
                        : "text-marantz-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>AV Receiver Control Panel</p>
              <p>v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
