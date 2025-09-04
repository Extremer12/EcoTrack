import React, { createContext, useState, useEffect, useContext } from 'react';
import { generateMockData } from '../data/mockData';
import { useNotification } from './NotificationContext';

const EcoTrackContext = createContext();

const EcoTrackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(() => {
    console.log('EcoTrackContext: Initializing data with generateMockData');
    const mockData = generateMockData();
    console.log('EcoTrackContext: Initial data generated:', mockData);
    setIsLoading(false);
    return mockData;
  });
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set loading to false after data initialization
  useEffect(() => {
    console.log('EcoTrackContext: Setting isLoading to false');
    setIsLoading(false);
  }, []);
  
  // Get notification hook safely
  let addNotification;
  try {
    const notificationContext = useNotification();
    addNotification = notificationContext.addNotification;
  } catch (error) {
    console.warn('Notification context not available');
    addNotification = (message) => console.log('Notification:', message);
  }

  // Simulate login
  useEffect(() => {
    const savedUser = localStorage.getItem('ecotrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    // Simulate authentication
    const mockUsers = {
      'admin': { id: 1, name: 'Prof. García', role: 'principal', email: 'garcia@school.edu' },
      'teacher3a': { id: 2, name: 'Prof. López', role: 'course_validator', course: '3A', email: 'lopez@school.edu' },
      'student1': { id: 3, name: 'Ana Martínez', role: 'student', course: '3A', email: 'ana@school.edu' }
    };

    const user = mockUsers[username];
    if (user && password) {
      setUser(user);
      localStorage.setItem('ecotrack_user', JSON.stringify(user));
      addNotification(`¡Bienvenido, ${user.name}! 🎉`, 'success');
    } else {
      addNotification('Usuario o contraseña incorrectos ❌', 'error');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecotrack_user');
    setActiveTab('login');
  };

  const registerRecycling = (selectedStudent, selectedMaterial, selectedSize) => {
    if (!selectedStudent || !selectedMaterial || !selectedSize) {
      addNotification('Por favor complete todos los campos requeridos ⚠️', 'warning');
      return;
    }

    if (!data || !data.students || !data.materials || !data.courses) {
      addNotification('❌ Error: Datos no disponibles', 'error');
      return;
    }

    const student = data.students.find(s => s.id.toString() === selectedStudent);
    const material = data.materials.find(m => m.id.toString() === selectedMaterial);
    
    if (!student || !material) {
      addNotification('❌ Error: Estudiante o material no encontrado', 'error');
      return;
    }
    
    const sizeData = material.sizes.find(s => s.size === selectedSize);
    const course = data.courses.find(c => c.name === student.course);
    
    if (!sizeData || !course) {
      addNotification('❌ Error: Tamaño o curso no encontrado', 'error');
      return;
    }

    // Update data (in real app, this would be an API call)
    const newData = { ...data };
    const recyclingEntry = {
      id: Date.now(),
      student: student.name,
      material: material.name,
      size: sizeData.size,
      unit: sizeData.unit,
      points: sizeData.points,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    newData.recyclingHistory.unshift(recyclingEntry);
    
    // Update student pending points
    const studentIndex = newData.students.findIndex(s => s.id === student.id);
    newData.students[studentIndex].pending += sizeData.points;
    
    // Update course pending points
    const courseIndex = newData.courses.findIndex(c => c.id === course.id);
    newData.courses[courseIndex].pointsPending += sizeData.points;

    setData(newData);
    
    addNotification(`✅ Reciclaje registrado: ${student.name} - ${material.name} (${sizeData.size}) +${sizeData.points} pts`, 'success', 5000);
  };

  const approveCourse = (courseId) => {
    if (!data || !data.courses || !data.students || !data.recyclingHistory) {
      addNotification('❌ Error: Datos no disponibles', 'error');
      return;
    }

    const newData = { ...data };
    const course = newData.courses.find(c => c.id === courseId);
    
    if (!course) {
      addNotification('❌ Error: Curso no encontrado', 'error');
      return;
    }
    const pointsToApprove = course.pointsPending;
    
    if (pointsToApprove === 0) {
      addNotification(`No hay puntos pendientes para el Curso ${course.name} 📝`, 'info');
      return;
    }
    
    // Move pending points to confirmed
    course.pointsConfirmed += course.pointsPending;
    course.pointsPending = 0;
    
    // Update students in this course
    let studentsAffected = 0;
    newData.students = newData.students.map(student => {
      if (student.course === course.name && student.pending > 0) {
        student.points += student.pending;
        student.pending = 0;
        studentsAffected++;
      }
      return student;
    });

    // Update recycling history
    newData.recyclingHistory = newData.recyclingHistory.map(entry => {
      const student = newData.students.find(s => s.name === entry.student);
      if (student?.course === course.name && entry.status === 'pending') {
        return { ...entry, status: 'confirmed' };
      }
      return entry;
    });

    setData(newData);
    addNotification(`🎉 ¡Aprobación exitosa! Curso ${course.name}: ${pointsToApprove} puntos confirmados para ${studentsAffected} estudiantes`, 'success', 6000);
  };

  const value = {
    data,
    isLoading,
    user,
    activeTab,
    setData,
    setActiveTab,
    login,
    logout,
    registerRecycling,
    approveCourse
  };

  return (
    <EcoTrackContext.Provider value={value}>
      {children}
    </EcoTrackContext.Provider>
  );
};

const useEcoTrack = () => {
  const context = useContext(EcoTrackContext);
  if (!context) {
    throw new Error('useEcoTrack must be used within an EcoTrackProvider');
  }
  return context;
};

export { EcoTrackContext, EcoTrackProvider, useEcoTrack };
export default EcoTrackContext;