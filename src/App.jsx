import React from 'react';
import { NotificationProvider } from './contexts/NotificationContext';
import { EcoTrackProvider } from './contexts/EcoTrackContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppContent from './components/AppContent';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <EcoTrackProvider>
            <AppContent />
          </EcoTrackProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;