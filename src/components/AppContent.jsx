import React from 'react';
import { useEcoTrack } from '../contexts/EcoTrackContext';
import { Icons } from './Icons';
import Login from './Login';
import Dashboard from './Dashboard';
import RecycleForm from './RecycleForm';
import ApprovalPanel from './ApprovalPanel';
import Rankings from './Rankings';
import History from './History';

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
                <h1 className="text-xl font-bold text-gray-900">EcoScore App</h1>
                <p className="text-sm text-gray-500">Sistema de Reciclaje Escolar</p>
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
              {activeTab === 'dashboard' && 'Panel Principal'}
              {activeTab === 'recycle' && 'Registrar Reciclaje'}
              {activeTab === 'approve' && 'Aprobar Puntos'}
              {activeTab === 'rankings' && 'Rankings'}
              {activeTab === 'history' && 'Historial'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-sm border border-green-100">
            <button
              onClick={() => setActiveTab('dashboard')}
              title="Ver resumen general y estadísticas"
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Home />
              <span>Dashboard</span>
              {activeTab === 'dashboard' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
            
            {user.role === 'course_validator' && (
              <button
                onClick={() => setActiveTab('recycle')}
                title="Registrar nuevo reciclaje de estudiantes"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === 'recycle'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
                }`}
              >
                <Icons.Plus />
                <span>Registrar</span>
                {activeTab === 'recycle' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </button>
            )}
            
            {user.role === 'principal' && (
              <button
                onClick={() => setActiveTab('approve')}
                title="Aprobar puntos pendientes de los cursos"
                className={`relative flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  activeTab === 'approve'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
                }`}
              >
                <Icons.Check />
                <span>Aprobar</span>
                {/* Notification badge for pending approvals */}
                {data.courses.some(course => course.pointsPending > 0) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                )}
                {activeTab === 'approve' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('rankings')}
              title="Ver clasificaciones de estudiantes y cursos"
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'rankings'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Trophy />
              <span>Rankings</span>
              {activeTab === 'rankings' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              title="Ver historial completo de reciclajes"
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50'
              }`}
            >
              <Icons.Chart />
              <span>Historial</span>
              {activeTab === 'history' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
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
                {activeTab === 'dashboard' && '📊 Panel Principal'}
                {activeTab === 'recycle' && '♻️ Registro de Reciclaje'}
                {activeTab === 'approve' && '✅ Aprobación de Puntos'}
                {activeTab === 'rankings' && '🏆 Rankings y Competencias'}
                {activeTab === 'history' && '📋 Historial de Actividades'}
              </h4>
              <p className="text-sm text-blue-800">
                {activeTab === 'dashboard' && 'Aquí puedes ver un resumen de todas las actividades de reciclaje, puntos totales y estadísticas generales.'}
                {activeTab === 'recycle' && 'Registra nuevos reciclajes seleccionando el estudiante, material y tamaño del pack. Los puntos quedarán pendientes de aprobación.'}
                {activeTab === 'approve' && 'Como validador principal, puedes aprobar los puntos pendientes de cada curso para que se conviertan en puntos confirmados.'}
                {activeTab === 'rankings' && 'Consulta las clasificaciones de estudiantes y cursos basadas en los puntos de reciclaje confirmados.'}
                {activeTab === 'history' && 'Revisa el historial completo de todas las actividades de reciclaje con filtros por estado, estudiante y fecha.'}
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
      </div>
    </div>
  );
};

export default AppContent;