import React, { useContext } from 'react';
import { Icons } from './Icons';

// Stat Card Component
const StatCard = ({ title, value, icon, gradient }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${gradient} p-4 rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ data, user }) => {
  // Calculate totals
  const totalConfirmed = data.courses.reduce((sum, course) => sum + course.pointsConfirmed, 0);
  const totalPending = data.courses.reduce((sum, course) => sum + course.pointsPending, 0);
  const totalStudents = data.students.length;
  const totalRecycling = data.recyclingHistory.length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido a EcoScore! 🌱</h1>
            <p className="text-emerald-100 text-lg">
              Juntos estamos construyendo un futuro más verde, un reciclaje a la vez.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">♻️</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Puntos Totales"
          value={totalConfirmed.toLocaleString()}
          icon={<Icons.Chart />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Pendientes"
          value={totalPending.toLocaleString()}
          icon={<Icons.Clock />}
          gradient="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Estudiantes"
          value={totalStudents}
          icon={<Icons.Users />}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Reciclajes"
          value={totalRecycling}
          icon={<Icons.Recycle />}
          gradient="from-emerald-500 to-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Rankings */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg mr-3">
              <Icons.Trophy className="text-white" />
            </div>
            Ranking por Curso
          </h3>
          <div className="space-y-4">
            {[...data.courses]
              .sort((a, b) => b.pointsConfirmed - a.pointsConfirmed)
              .map((course, index) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-102">
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900' :
                    index === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900 text-lg">Curso {course.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xl">{course.pointsConfirmed}</div>
                  {course.pointsPending > 0 && (
                    <div className="text-sm text-orange-600 font-medium">+{course.pointsPending} pendientes</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Rankings */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg mr-3">
              <Icons.User className="text-white" />
            </div>
            Top Recicladores
          </h3>
          <div className="space-y-4">
            {[...data.students]
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-102">
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900' :
                    index === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{student.course}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xl">{student.points}</div>
                  {student.pending > 0 && (
                    <div className="text-sm text-orange-600 font-medium">+{student.pending}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-2">
          {data.recyclingHistory.slice(0, 5).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  entry.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">{entry.student}</div>
                  <div className="text-sm text-gray-500">
                    {entry.material} ({entry.unit}) - {entry.date}
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                entry.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {entry.status === 'confirmed' ? 'Aprobado' : 'Pendiente'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;