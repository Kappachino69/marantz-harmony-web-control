
import React, { useState } from 'react';
import { ThemeProvider } from '@/hooks/use-theme';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MainSection } from '@/components/sections/MainSection';
import { ZonesSection } from '@/components/sections/ZonesSection';
import { SoundModesSection } from '@/components/sections/SoundModesSection';
import { SettingsSection } from '@/components/sections/SettingsSection';
import { AboutSection } from '@/components/sections/AboutSection';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'main':
        return <MainSection />;
      case 'zones':
        return <ZonesSection />;
      case 'sound-modes':
        return <SoundModesSection />;
      case 'settings':
        return <SettingsSection />;
      case 'about':
        return <AboutSection />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex">
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
