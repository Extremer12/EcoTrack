import React from 'react';
import { useEcoTrack } from '../contexts/EcoTrackContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Icons } from './Icons';
import Login from './Login';
import Dashboard from './Dashboard';
import RecycleForm from './RecycleForm';
import ApprovalPanel from './ApprovalPanel';
import Rankings from './Rankings';
import History from './History';
import StudentProfile from './StudentProfile';
import Settings from './Settings';

const AppContent = () => {
  const { 
    data, 
    user, 
    activeTab, 
    setActiveTab, 
    logout, 
    registerRecycling, 
    approveCourse 
  } = useEcoTrack();
  const { t } = useLanguage();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Icons.Recycle />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('loginTitle')}</h1>
                <p className="text-sm text-gray-500">{t('loginSubtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icons.LogOut />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Icons.Home className="w-4 h-4" />
            <span>/</span>
            <span className="text-emerald-600 font-medium capitalize">
              {activeTab === 'dashboard' && t('dashboard')}
              {activeTab === 'recycle' && t('recycle')}
              {activeTab === 'approve' && t('approval')}
              {activeTab === 'rankings' && t('rankings')}
              {activeTab === 'history' && t('history')}
              {activeTab === 'profile' && t('profile')}
              {activeTab === 'settings' && t('settings')}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-sm border border-green-100">
            <button
              onClick={() => setActiveTab('dashboard')}
              title={t('dashboard')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Home />
              <span>{t('dashboard')}</span>
              {activeTab === 'dashboard' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
            
            {user.role === 'course_validator' && (
              <button
                onClick={() => setActiveTab('recycle')}
                title={t('recycle')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === 'recycle'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
                }`}
              >
                <Icons.Plus />
                <span>{t('recycle')}</span>
                {activeTab === 'recycle' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </button>
            )}
            
            {user.role === 'principal' && (
              <button
                onClick={() => setActiveTab('approve')}
                title={t('approval')}
                className={`relative flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === 'approve'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
                }`}
              >
                <Icons.Check />
                <span>{t('approval')}</span>
                {/* Notification badge for pending approvals */}
                {data.courses.some(course => course.pointsPending > 0) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                )}
                {activeTab === 'approve' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('rankings')}
              title={t('rankings')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'rankings'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Trophy />
              <span>{t('rankings')}</span>
              {activeTab === 'rankings' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              title={t('history')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Chart />
              <span>{t('history')}</span>
              {activeTab === 'history' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
            
            {user.role === 'student' && (
              <button
                onClick={() => setActiveTab('profile')}
                title={t('profile')}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
                }`}
              >
                <Icons.User />
                <span>{t('profile')}</span>
                {activeTab === 'profile' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('settings')}
              title={t('settings')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Settings />
              <span>{t('settings')}</span>
              {activeTab === 'settings' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </div>
        </nav>

        {/* Help Section */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 mt-0.5">
              <Icons.Recycle />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                {activeTab === 'dashboard' && t('helpDashboard')}
                {activeTab === 'recycle' && t('helpRecycle')}
                {activeTab === 'approve' && t('helpApprove')}
                {activeTab === 'rankings' && t('helpRankings')}
                {activeTab === 'history' && t('helpHistory')}
                {activeTab === 'profile' && t('helpProfile')}
              </h4>
              <p className="text-sm text-blue-800">
                {activeTab === 'dashboard' && t('helpDashboardDesc')}
                {activeTab === 'recycle' && t('helpRecycleDesc')}
                {activeTab === 'approve' && t('helpApproveDesc')}
                {activeTab === 'rankings' && t('helpRankingsDesc')}
                {activeTab === 'history' && t('helpHistoryDesc')}
                {activeTab === 'profile' && t('helpProfileDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'recycle' && <RecycleForm />}
        {activeTab === 'approve' && <ApprovalPanel />}
        {activeTab === 'rankings' && <Rankings />}
        {activeTab === 'history' && <History />}
        {activeTab === 'profile' && <StudentProfile />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default AppContent;