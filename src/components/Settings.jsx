import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';
import { SettingsIcon, CheckIcon } from './Icons';

const Settings = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const { addNotification } = useNotification();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleSaveSettings = () => {
    changeLanguage(selectedLanguage);
    if (selectedTheme === 'light') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
    addNotification(t('settingsSaved'), 'success');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <SettingsIcon className="settings-icon" />
        <h2>{t('settingsTitle')}</h2>
      </div>

      <div className="settings-content">
        <div className="setting-group">
          <label className="setting-label">
            {t('language')}
          </label>
          <div className="language-options">
            <div 
              className={`language-option ${selectedLanguage === 'es' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('es')}
            >
              <div className="language-info">
                <span className="language-flag">🇪🇸</span>
                <span className="language-name">{t('spanish')}</span>
              </div>
              {selectedLanguage === 'es' && <CheckIcon className="check-icon" />}
            </div>
            
            <div 
              className={`language-option ${selectedLanguage === 'en' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('en')}
            >
              <div className="language-info">
                <span className="language-flag">🇺🇸</span>
                <span className="language-name">{t('english')}</span>
              </div>
              {selectedLanguage === 'en' && <CheckIcon className="check-icon" />}
            </div>
          </div>
        </div>

        <div className="setting-group">
          <label className="setting-label">
            {t('theme')}
          </label>
          <div className="theme-options">
            <div 
              className={`theme-option ${selectedTheme === 'light' ? 'selected' : ''}`}
              onClick={() => setSelectedTheme('light')}
            >
              <div className="theme-info">
                <span className="theme-icon">☀️</span>
                <span className="theme-name">{t('lightMode')}</span>
              </div>
              {selectedTheme === 'light' && <CheckIcon className="check-icon" />}
            </div>
            
            <div 
              className={`theme-option ${selectedTheme === 'dark' ? 'selected' : ''}`}
              onClick={() => setSelectedTheme('dark')}
            >
              <div className="theme-info">
                <span className="theme-icon">🌙</span>
                <span className="theme-name">{t('darkMode')}</span>
              </div>
              {selectedTheme === 'dark' && <CheckIcon className="check-icon" />}
            </div>
          </div>
        </div>

        <button 
          className="save-button"
          onClick={handleSaveSettings}
          disabled={selectedLanguage === language && selectedTheme === theme}
        >
          {t('saveSettings')}
        </button>
      </div>

      <style>{`
        .settings-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .settings-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .settings-icon {
          width: 28px;
          height: 28px;
          color: #4CAF50;
        }

        .settings-header h2 {
          margin: 0;
          color: #333;
          font-size: 24px;
          font-weight: 600;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .setting-label {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .language-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .language-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .language-option:hover {
          border-color: #4CAF50;
          background: #f8fff8;
        }

        .language-option.selected {
          border-color: #4CAF50;
          background: #e8f5e8;
        }

        .language-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .language-flag {
          font-size: 24px;
        }

        .language-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          color: #4CAF50;
        }

        .theme-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .theme-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .theme-option:hover {
          border-color: #4CAF50;
          background: #f8fff8;
        }

        .theme-option.selected {
          border-color: #4CAF50;
          background: #e8f5e8;
        }

        .theme-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-icon {
          font-size: 24px;
        }

        .theme-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .save-button {
          padding: 12px 24px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .save-button:hover:not(:disabled) {
          background: #45a049;
          transform: translateY(-2px);
        }

        .save-button:disabled {
          background: #cccccc;
          cursor: not-allowed;
          transform: none;
        }

        /* Dark theme styles */
        .dark-theme .settings-container {
          background: #2d2d2d;
          color: #e0e0e0;
        }

        .dark-theme .settings-header {
          border-bottom-color: #404040;
        }

        .dark-theme .settings-header h2 {
          color: #e0e0e0;
        }

        .dark-theme .setting-label {
          color: #e0e0e0;
        }

        .dark-theme .language-option,
        .dark-theme .theme-option {
          background: #3a3a3a;
          border-color: #505050;
        }

        .dark-theme .language-option:hover,
        .dark-theme .theme-option:hover {
          background: #404040;
          border-color: #4CAF50;
        }

        .dark-theme .language-option.selected,
        .dark-theme .theme-option.selected {
          background: #2d4a2d;
          border-color: #4CAF50;
        }

        .dark-theme .language-name,
        .dark-theme .theme-name {
          color: #e0e0e0;
        }

        @media (max-width: 768px) {
          .settings-container {
            margin: 10px;
            padding: 15px;
          }

          .settings-header h2 {
            font-size: 20px;
          }

          .language-option {
            padding: 14px 16px;
          }

          .language-name {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;