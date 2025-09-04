import React from 'react';
import { useEcoTrack } from '../contexts/EcoTrackContext';
import { useLanguage } from '../contexts/LanguageContext';

const StudentProfile = () => {
  const { data, user } = useEcoTrack();
  const { t } = useLanguage();

  if (!user || user.role !== 'student') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">{t('accessDeniedStudents')}</p>
      </div>
    );
  }

  // Buscar información del estudiante
  const student = data?.students?.find(s => s.id === user.id);
  const course = data?.courses?.find(c => c.id === student?.courseId);
  const teacher = course?.teacher;

  // Calcular puntos totales del historial de reciclaje
  const studentRecyclingHistory = data?.recyclingHistory?.filter(h => h.studentId === user.id) || [];
  const totalPoints = studentRecyclingHistory.reduce((sum, record) => sum + record.points, 0);

  // Estadísticas de reciclaje
  const recyclingStats = {
    totalRecords: studentRecyclingHistory.length,
    totalWeight: studentRecyclingHistory.reduce((sum, record) => sum + record.weight, 0),
    materialTypes: [...new Set(studentRecyclingHistory.map(record => record.materialType))].length
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header del Perfil */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-6">
          {/* Foto de Perfil */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {student?.name?.charAt(0) || user.username?.charAt(0) || 'E'}
              </span>
            </div>
          </div>
          
          {/* Información Personal */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {student?.name || user.username || 'Estudiante'}
            </h1>
            <div className="space-y-1 text-green-100">
              <p className="flex items-center">
                <span className="mr-2">🎓</span>
                <span className="font-medium">{t('course')}:</span>
                <span className="ml-2">{course?.name || t('notAssigned')}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">👨‍🏫</span>
                <span className="font-medium">{t('teacher')}:</span>
                <span className="ml-2">{teacher || t('notAssigned')}</span>
              </p>
            </div>
          </div>
          
          {/* Puntos Totales */}
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl font-bold">{totalPoints}</div>
              <div className="text-sm text-green-100">{t('ecoTrackPoints')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas de Reciclaje */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('totalRecords')}</h3>
              <p className="text-3xl font-bold text-green-600">{recyclingStats.totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">⚖️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('totalWeight')}</h3>
              <p className="text-3xl font-bold text-blue-600">{recyclingStats.totalWeight.toFixed(1)} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('materialTypes')}</h3>
              <p className="text-3xl font-bold text-purple-600">{recyclingStats.materialTypes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de Reciclaje */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📋</span>
            {t('myRecyclingHistory')}
          </h2>
        </div>
        
        <div className="p-6">
          {studentRecyclingHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-gray-500 text-lg">{t('noRecyclingRecords')}</p>
              <p className="text-gray-400 mt-2">{t('startRecyclingMessage')}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {studentRecyclingHistory
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">
                        {record.materialType === 'plastic' ? '🥤' :
                         record.materialType === 'paper' ? '📄' :
                         record.materialType === 'glass' ? '🍶' :
                         record.materialType === 'metal' ? '🥫' : '♻️'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {record.materialType}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{record.points} pts</div>
                    <div className="text-sm text-gray-500">{record.weight} kg</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progreso y Logros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🏆</span>
          {t('progressAndAchievements')}
        </h2>
        
        <div className="space-y-4">
          {/* Barra de Progreso */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{t('progressToNextLevel')}</span>
              <span className="text-sm text-gray-500">{totalPoints % 100}/100 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(totalPoints % 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Logros */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className={`p-4 rounded-lg text-center ${
              totalPoints >= 50 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            } border-2`}>
              <div className="text-2xl mb-2">🌱</div>
              <div className="text-sm font-medium">{t('firstStep')}</div>
              <div className="text-xs text-gray-600">{t('fiftyPlusPoints')}</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${
              totalPoints >= 100 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            } border-2`}>
              <div className="text-2xl mb-2">🌿</div>
              <div className="text-sm font-medium">{t('ecoWarrior')}</div>
              <div className="text-xs text-gray-600">{t('hundredPlusPoints')}</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${
              totalPoints >= 250 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            } border-2`}>
              <div className="text-2xl mb-2">🌳</div>
              <div className="text-sm font-medium">{t('greenGuardian')}</div>
              <div className="text-xs text-gray-600">{t('twoFiftyPlusPoints')}</div>
            </div>
            
            <div className={`p-4 rounded-lg text-center ${
              totalPoints >= 500 ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            } border-2`}>
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-medium">{t('ecoChampion')}</div>
              <div className="text-xs text-gray-600">{t('fiveHundredPlusPoints')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;