
import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white dark:bg-marantz-dark shadow-sm">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Menu size={24} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9ca9da90-e738-480b-96f7-97bc27a4d936.png" 
            alt="Marantz SR6009" 
            className="h-8 w-auto hidden md:block" 
          />
          <h1 className="text-xl font-display font-semibold">
            <span className="text-marantz-dark dark:text-white">Marantz</span>
            <span className="text-marantz-accent ml-1">SR6009</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
