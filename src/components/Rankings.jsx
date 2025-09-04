import React from 'react';
import { useEcoTrack } from '../contexts/EcoTrackContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Icons } from './Icons';

const Rankings = () => {
  const { data, isLoading } = useEcoTrack();
  const { t } = useLanguage();

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('loadingRankings')}</p>
      </div>
    );
  }
  
  // Safety check for data after loading
  if (!data || !data.students) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">⚠️</div>
        <p className="text-gray-600">{t('errorLoadingRankings')}</p>
      </div>
    );
  }

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getRankStyle = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-lg transform scale-110';
    if (index === 1) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 shadow-md';
    if (index === 2) return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md';
    return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700';
  };

  const getCardStyle = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg transform hover:scale-105';
    if (index === 1) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 shadow-md transform hover:scale-105';
    if (index === 2) return 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-md transform hover:scale-105';
    return 'bg-white border border-gray-200 hover:border-emerald-300 transform hover:scale-105';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('rankingsTitle')}</h2>
            <p className="text-purple-100 text-lg">
              {t('discoverChampions')}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">🏆</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Rankings */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl mr-4">
              <Icons.Trophy className="text-white" />
            </div>
            {t('individualRanking')}
          </h3>
          <div className="space-y-4">
            {[...data.students]
              .sort((a, b) => b.points - a.points)
              .map((student, index) => (
              <div key={student.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${getCardStyle(index)}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${getRankStyle(index)}`}>
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{student.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{student.course}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xl">{student.points} {t('pts')}</div>
                  {student.pending > 0 && (
                    <div className="text-sm text-orange-600 font-semibold">+{student.pending} {t('pendingPoints')}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Rankings */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl mr-4">
              <Icons.Trophy className="text-white" />
            </div>
            {t('courseRanking')}
          </h3>
          <div className="space-y-4">
            {[...data.courses]
              .sort((a, b) => b.pointsConfirmed - a.pointsConfirmed)
              .map((course, index) => (
              <div key={course.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${getCardStyle(index)}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${getRankStyle(index)}`}>
                    {getRankIcon(index)}
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{t('course')} {course.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xl">{course.pointsConfirmed} {t('pts')}</div>
                  {course.pointsPending > 0 && (
                    <div className="text-sm text-orange-600 font-semibold">+{course.pointsPending} {t('pendingPoints')}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;