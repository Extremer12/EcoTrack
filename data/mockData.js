// Mock data generator
export const generateMockData = () => {
  const courses = [
    { id: 1, name: "3A", pointsPending: 450, pointsConfirmed: 1200 },
    { id: 2, name: "4B", pointsPending: 620, pointsConfirmed: 980 },
    { id: 3, name: "5C", pointsPending: 310, pointsConfirmed: 1500 },
    { id: 4, name: "6D", pointsPending: 780, pointsConfirmed: 800 },
    { id: 5, name: "7E", pointsPending: 220, pointsConfirmed: 1100 },
  ];

  const materials = [
    { 
      id: 1, 
      name: "Plástico PET", 
      sizes: [
        { size: "pequeño", unit: "Bolsa Pequeña", points: 30, description: "Hasta 1kg" },
        { size: "mediano", unit: "Bolsa Mediana", points: 50, description: "1-3kg" },
        { size: "grande", unit: "Bolsa Grande", points: 80, description: "Más de 3kg" }
      ]
    },
    { 
      id: 2, 
      name: "Papel y Cartón", 
      sizes: [
        { size: "pequeño", unit: "Caja Pequeña", points: 25, description: "Hasta 2kg" },
        { size: "mediano", unit: "Caja Mediana", points: 40, description: "2-5kg" },
        { size: "grande", unit: "Caja Grande", points: 65, description: "Más de 5kg" }
      ]
    },
    { 
      id: 3, 
      name: "Vidrio", 
      sizes: [
        { size: "pequeño", unit: "Bolsa Pequeña", points: 20, description: "Hasta 1kg" },
        { size: "mediano", unit: "Bolsa Mediana", points: 35, description: "1-3kg" },
        { size: "grande", unit: "Bolsa Grande", points: 55, description: "Más de 3kg" }
      ]
    },
    { 
      id: 4, 
      name: "Latas de Aluminio", 
      sizes: [
        { size: "pequeño", unit: "Bolsa Pequeña", points: 35, description: "Hasta 0.5kg" },
        { size: "mediano", unit: "Bolsa Mediana", points: 60, description: "0.5-1.5kg" },
        { size: "grande", unit: "Bolsa Grande", points: 90, description: "Más de 1.5kg" }
      ]
    },
  ];

  const students = [
    { id: 1, name: "Ana Martínez", course: "3A", points: 240, pending: 100 },
    { id: 2, name: "Carlos Ruiz", course: "3A", points: 180, pending: 50 },
    { id: 3, name: "Lucía Fernández", course: "4B", points: 196, pending: 124 },
    { id: 4, name: "Miguel Torres", course: "4B", points: 98, pending: 202 },
    { id: 5, name: "Sofía Pérez", course: "5C", points: 300, pending: 60 },
    { id: 6, name: "Javier Gómez", course: "5C", points: 280, pending: 30 },
    { id: 7, name: "Elena Díaz", course: "6D", points: 160, pending: 220 },
    { id: 8, name: "Andrés López", course: "6D", points: 120, pending: 180 },
    { id: 9, name: "Paula Ramírez", course: "7E", points: 220, pending: 40 },
    { id: 10, name: "Roberto Castro", course: "7E", points: 200, pending: 180 },
  ];

  const recyclingHistory = [
    { id: 1, student: "Ana Martínez", material: "Plástico PET", unit: "Bolsa Mediana", size: "mediano", points: 50, date: "2023-11-15", status: "confirmed" },
    { id: 2, student: "Ana Martínez", material: "Papel y Cartón", unit: "Caja Mediana", size: "mediano", points: 40, date: "2023-11-14", status: "confirmed" },
    { id: 3, student: "Carlos Ruiz", material: "Latas de Aluminio", unit: "Bolsa Mediana", size: "mediano", points: 60, date: "2023-11-15", status: "pending" },
    { id: 4, student: "Lucía Fernández", material: "Plástico PET", unit: "Bolsa Grande", size: "grande", points: 80, date: "2023-11-15", status: "pending" },
    { id: 5, student: "Miguel Torres", material: "Vidrio", unit: "Bolsa Pequeña", size: "pequeño", points: 20, date: "2023-11-14", status: "confirmed" },
    { id: 6, student: "Sofía Pérez", material: "Papel y Cartón", unit: "Caja Grande", size: "grande", points: 65, date: "2023-11-16", status: "confirmed" },
    { id: 7, student: "Elena Díaz", material: "Plástico PET", unit: "Bolsa Pequeña", size: "pequeño", points: 30, date: "2023-11-16", status: "pending" },
  ];

  return { courses, materials, students, recyclingHistory };
};

export default generateMockData;