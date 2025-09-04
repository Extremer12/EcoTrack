import React, { useState } from 'react';
import { Icons } from './Icons';
import { useEcoTrack } from '../contexts/EcoTrackContext';

// Recycle Form Component
const RecycleForm = () => {
  const { data, user, isLoading, registerRecycling } = useEcoTrack();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando formulario...</p>
      </div>
    );
  }
  
  // Safety check for data after loading
  if (!data || !data.students || !data.materials) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">⚠️</div>
        <p className="text-gray-600">Error: No se pudieron cargar los datos del formulario</p>
      </div>
    );
  }

  const filteredStudents = data.students.filter(student => 
    student.course === user.course
  );

  const selectedMaterialData = data.materials.find(m => m.id === parseInt(selectedMaterial));
  const selectedSizeData = selectedMaterialData?.sizes.find(s => s.size === selectedSize);

  const handleRegister = () => {
    registerRecycling(selectedStudent, selectedMaterial, selectedSize);
    // Clear form after successful registration
    setSelectedStudent('');
    setSelectedMaterial('');
    setSelectedSize('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Icons.Plus className="mr-2 text-emerald-500" />
        Registrar Reciclaje
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          >
            <option value="">Seleccionar estudiante...</option>
            {filteredStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} (Curso: {student.course})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material Reciclable</label>
          <select
            value={selectedMaterial}
            onChange={(e) => {
              setSelectedMaterial(e.target.value);
              setSelectedSize(''); // Reset size when material changes
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          >
            <option value="">Seleccionar material...</option>
            {data.materials.map(material => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        {selectedMaterial && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Tamaño del Pack</label>
            <div className="grid grid-cols-1 gap-3">
              {selectedMaterialData?.sizes.map(sizeOption => (
                <div
                  key={sizeOption.size}
                  onClick={() => setSelectedSize(sizeOption.size)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedSize === sizeOption.size
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {sizeOption.size} - {sizeOption.unit}
                      </div>
                      <div className="text-sm text-gray-600">{sizeOption.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        {sizeOption.points}
                      </div>
                      <div className="text-xs text-gray-500">puntos</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSizeData && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-emerald-900">Resumen del Registro</h4>
                <p className="text-sm text-emerald-800 mt-1">
                  {selectedMaterialData?.name} - {selectedSizeData.unit}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">
                  +{selectedSizeData.points}
                </div>
                <div className="text-xs text-emerald-700">puntos pendientes</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 mt-0.5">
              <Icons.Recycle />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Instrucciones</h4>
              <p className="text-sm text-blue-800 mt-1">
                1. Seleccione al estudiante que va a reciclar<br/>
                2. Seleccione el tipo de material reciclable<br/>
                3. Elija el tamaño del pack según el peso/volumen<br/>
                4. Confirme visualmente que el contenido es correcto<br/>
                5. Registre el reciclaje (los puntos estarán pendientes de aprobación)
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={!selectedStudent || !selectedMaterial || !selectedSize}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {selectedSizeData ? `Registrar Reciclaje (+${selectedSizeData.points} puntos)` : 'Registrar Reciclaje'}
        </button>
      </div>
    </div>
  );
};

export default RecycleForm;