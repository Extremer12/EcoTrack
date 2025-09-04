import React, { useContext, useState } from 'react';
import { EcoTrackContext } from '../contexts/EcoTrackContext';
import { Icons } from './Icons';

const History = () => {
  const { data, user } = useContext(EcoTrackContext);
  const [filter, setFilter] = useState('all');

  const filteredHistory = data.recyclingHistory.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'pending') return entry.status === 'pending';
    if (filter === 'confirmed') return entry.status === 'confirmed';
    if (filter === 'mine' && user.role === 'student') {
      return entry.student === user.name;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Icons.Chart className="mr-2 text-emerald-500" />
          Historial de Reciclaje
        </h3>
        
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Todos</option>
            <option value="confirmed">Aprobados</option>
            <option value="pending">Pendientes</option>
            {user.role === 'student' && <option value="mine">Mi historial</option>}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                entry.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <div>
                <div className="font-medium text-gray-900">{entry.student}</div>
                <div className="text-sm text-gray-500">
                  {entry.material} ({entry.unit}) • {entry.date}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                entry.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {entry.status === 'confirmed' ? 'Aprobado' : 'Pendiente'}
              </div>
              <div className="font-bold text-emerald-600">{entry.points} pts</div>
            </div>
          </div>
        ))}
        
        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay registros de reciclaje que coincidan con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;