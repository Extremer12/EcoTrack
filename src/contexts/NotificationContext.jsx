import React, { createContext, useContext, useState } from 'react';

// Notification system
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`w-full bg-white shadow-xl rounded-lg pointer-events-auto border-l-4 transform transition-all duration-300 hover:scale-105 ${
            notification.type === 'success' ? 'border-green-500 bg-green-50' :
            notification.type === 'error' ? 'border-red-500 bg-red-50' :
            notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
            'border-blue-500 bg-blue-50'
          }`}
        >
          <div className="p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notification.type === 'success' && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
                {notification.type === 'error' && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✕</span>
                  </div>
                )}
                {notification.type === 'warning' && (
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⚠</span>
                  </div>
                )}
                {notification.type === 'info' && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ℹ</span>
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight break-words">
                  {notification.message}
                </p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <button
                  className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  onClick={() => onRemove(notification.id)}
                >
                  <span className="sr-only">Cerrar</span>
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };