import React from 'react';
import { Icons } from './Icons';
import { useEcoTrack } from '../contexts/EcoTrackContext';

// Approval Panel Component
const ApprovalPanel = () => {
  const { data, approveCourse, isLoading } = useEcoTrack();

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    );
  }
  
  // Safety check for data after loading
  if (!data || !data.courses || !data.students || !data.recyclingHistory) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">⚠️</div>
        <p className="text-gray-600">Error: No se pudieron cargar los datos</p>
      </div>
    );
  }

  // Get pending recycling details by course
  const getPendingRecyclingByCourse = (courseName) => {
    return data.recyclingHistory.filter(item => 
      item.status === 'pending' && 
      data.students.find(student => student.name === item.student)?.course === courseName
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Panel de Validación 🛡️</h2>
            <p className="text-blue-100 text-lg">
              Revisa y aprueba los reciclajes registrados por los profesores.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">✅</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl mr-4">
            <Icons.Check className="text-white" />
          </div>
          Aprobar Puntos por Curso
        </h3>

        <div className="space-y-6">
          {data.courses.map(course => {
            const pendingItems = getPendingRecyclingByCourse(course.name);
            return (
              <div key={course.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-300 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Curso {course.name}</h4>
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold text-orange-600">{course.pointsPending} puntos pendientes</span> • 
                      <span className="font-semibold text-emerald-600">{course.pointsConfirmed} puntos confirmados</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-orange-500">{course.pointsPending}</div>
                    <div className="text-sm text-gray-500 font-medium">pendientes</div>
                  </div>
                </div>
                
                {/* Pending items details */}
                {pendingItems.length > 0 && (
                  <div className="mb-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <h5 className="font-semibold text-orange-900 mb-2">Reciclajes Pendientes:</h5>
                    <div className="space-y-2">
                      {pendingItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <span className="text-orange-800">
                            {item.student} - {item.material} ({item.size})
                          </span>
                          <span className="font-bold text-orange-600">+{item.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {course.pointsPending > 0 ? (
                  <button
                    onClick={() => approveCourse(course.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <Icons.Check className="w-6 h-6" />
                    <span>Aprobar {course.pointsPending} puntos del Curso {course.name}</span>
                  </button>
                ) : (
                  <div className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 py-4 px-6 rounded-xl text-center font-semibold border-2 border-green-200">
                    ✅ No hay puntos pendientes - Todo aprobado
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 mt-0.5">
            <Icons.Recycle />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Proceso de Aprobación</h4>
            <p className="text-sm text-blue-800 mt-1">
              El validador principal debe:<br/>
              1. Recoger físicamente las bolsas/cajas de los cursos<br/>
              2. Realizar una revisión aleatoria o por lotes para confirmar la veracidad<br/>
              3. Aprobar los puntos en la aplicación<br/>
              4. Los puntos pendientes se moverán a "confirmados" y se actualizarán los rankings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPanel;