import React from 'react';
import { NotificationProvider } from './contexts/NotificationContext';
import { EcoTrackProvider } from './contexts/EcoTrackContext';
import AppContent from './components/AppContent';

const App = () => {
  return (
    <NotificationProvider>
      <EcoTrackProvider>
        <AppContent />
      </EcoTrackProvider>
    </NotificationProvider>
  );
};

export default App;