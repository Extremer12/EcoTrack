import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    /* Navigation */
    dashboard: 'Dashboard',
    recycle: 'Reciclar',
    rankings: 'Rankings',
    history: 'Historial',
    approval: 'Aprobación',
    profile: 'Perfil',
    settings: 'Configuraciones',
    logout: 'Cerrar Sesión',
    
    /* Login */
    loginTitle: 'EcoTrack',
    loginSubtitle: 'Sistema de Reciclaje Escolar',
    username: 'Usuario',
    password: 'Contraseña',
    loginButton: 'Iniciar Sesión',
    loginError: 'Usuario o contraseña incorrectos',
    
    /* Dashboard */
    welcomeTitle: '¡Bienvenido a EcoTrack! 🌱',
    welcomeSubtitle: 'Juntos estamos construyendo un futuro más verde, un reciclaje a la vez.',
    welcomeMessage: '¡Bienvenido a EcoTrack! 🌱',
    generalStats: 'Estadísticas Generales',
    totalMaterials: 'Materiales Totales',
    totalPoints: 'Puntos Totales',
    activeStudents: 'Estudiantes Activos',
    recyclingStats: 'Estadísticas de Reciclaje',
    pending: 'Pendientes',
    students: 'Estudiantes',
    recyclings: 'Reciclajes',
    errorLoadingData: 'Error: No se pudieron cargar los datos',
    plastic: 'Plástico',
    paper: 'Papel',
    glass: 'Vidrio',
    metal: 'Metal',
    organic: 'Orgánico',
    
    /* Recycle Form */
    recycleTitle: 'Registrar Material Reciclado',
    materialType: 'Tipo de Material',
    selectMaterial: 'Selecciona un material',
    packSize: 'Tamaño del Paquete',
    selectSize: 'Selecciona un tamaño',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    extraLarge: 'Extra Grande',
    registerButton: 'Registrar',
    successMessage: 'Material registrado exitosamente',
    
    /* Rankings */
    rankingsTitle: 'Rankings EcoTrack 🏆',
    studentRankings: 'Ranking de Estudiantes',
    courseRankings: 'Ranking de Cursos',
    student: 'Estudiante',
    course: 'Curso',
    points: 'Puntos',
    loadingRankings: 'Cargando rankings...',
    errorLoadingRankings: 'Error: No se pudieron cargar los datos de rankings',
    discoverChampions: '¡Descubre quiénes son los campeones del reciclaje!',
    individualRanking: 'Ranking Individual 👤',
    courseRanking: 'Ranking por Curso 🏫',
    pts: 'pts',
    pendingPoints: 'pendientes',
    
    /* History */
    historyTitle: 'Historial de Reciclaje',
    date: 'Fecha',
    material: 'Material',
    size: 'Tamaño',
    status: 'Estado',
    approved: 'Aprobado',
    pending: 'Pendiente',
    rejected: 'Rechazado',
    noHistory: 'No hay historial disponible',
    loadingHistory: 'Cargando historial...',
    errorLoadingHistory: 'Error: No se pudieron cargar los datos del historial',
    recyclingHistory: 'Historial de Reciclaje',
    all: 'Todos',
    confirmed: 'Aprobados',
    myHistory: 'Mi historial',
    noRecordsMatch: 'No hay registros de reciclaje que coincidan con los filtros seleccionados.',
    
    /* Approval Panel */
    approvalTitle: 'Panel de Aprobación',
    pendingApprovals: 'Aprobaciones Pendientes',
    approve: 'Aprobar',
    reject: 'Rechazar',
    noPendingApprovals: 'No hay aprobaciones pendientes',
    
    /* Student Profile */
    profileTitle: 'Mi Perfil',
    personalInfo: 'Información Personal',
    name: 'Nombre',
    email: 'Email',
    teacher: 'Profesor',
    myStats: 'Mis Estadísticas',
    myPoints: 'Mis Puntos',
    materialsRecycled: 'Materiales Reciclados',
    achievements: 'Logros',
    myHistory: 'Mi Historial',
    
    /* Student Profile - Extended */
    accessDeniedStudents: 'Acceso denegado. Solo para estudiantes.',
    course: 'Curso',
    teacher: 'Profesor',
    notAssigned: 'No asignado',
    ecoTrackPoints: 'Puntos EcoTrack',
    totalRecords: 'Registros Totales',
    totalWeight: 'Peso Total',
    materialTypes: 'Tipos de Material',
    myRecyclingHistory: 'Mi Historial de Reciclaje',
    noRecyclingRecords: '¡Aún no tienes registros de reciclaje!',
    startRecyclingMessage: 'Comienza a reciclar para ganar puntos EcoTrack',
    progressAndAchievements: 'Progreso y Logros',
    progressToNextLevel: 'Progreso hacia el siguiente nivel',
    firstStep: 'Primer Paso',
    fiftyPlusPoints: '50+ puntos',
    ecoWarrior: 'Eco Guerrero',
    hundredPlusPoints: '100+ puntos',
    greenGuardian: 'Guardián Verde',
    twoFiftyPlusPoints: '250+ puntos',
    ecoChampion: 'Campeón Eco',
    fiveHundredPlusPoints: '500+ puntos',
    
    /* Achievements */
    ecoWarrior: 'Guerrero Ecológico',
    ecoWarriorDesc: '¡Has reciclado más de 50 materiales!',
    recyclingChampion: 'Campeón del Reciclaje',
    recyclingChampionDesc: '¡Has alcanzado 500 puntos!',
    greenLeader: 'Líder Verde',
    greenLeaderDesc: '¡Estás en el top 10 de tu curso!',
    planetProtector: 'Protector del Planeta',
    planetProtectorDesc: '¡Has reciclado todos los tipos de materiales!',
    
    /* Settings */
    settingsTitle: 'Configuraciones',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
    theme: 'Tema',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro',
    saveSettings: 'Guardar Configuraciones',
    settingsSaved: 'Configuraciones guardadas exitosamente',
    
    /* Notifications */
    materialApproved: 'Material aprobado',
    materialRejected: 'Material rechazado',
    newAchievement: 'Nuevo logro desbloqueado',
    
    /* Help Section */
    helpDashboard: '📊 Panel Principal',
    helpRecycle: '♻️ Registro de Reciclaje',
    helpApprove: '✅ Aprobación de Puntos',
    helpRankings: '🏆 Rankings y Competencias',
    helpHistory: '📋 Historial de Actividades',
    helpProfile: '👤 Mi Perfil Personal',
    helpDashboardDesc: 'Aquí puedes ver un resumen de todas las actividades de reciclaje, puntos totales y estadísticas generales.',
    helpRecycleDesc: 'Registra nuevos reciclajes seleccionando el estudiante, material y tamaño del pack. Los puntos quedarán pendientes de aprobación.',
    helpApproveDesc: 'Como validador principal, puedes aprobar los puntos pendientes de cada curso para que se conviertan en puntos confirmados.',
    helpRankingsDesc: 'Consulta las clasificaciones de estudiantes y cursos basadas en los puntos de reciclaje confirmados.',
    helpHistoryDesc: 'Revisa el historial completo de todas las actividades de reciclaje con filtros por estado, estudiante y fecha.',
    helpProfileDesc: 'Consulta tu información personal, puntos totales, historial de reciclaje, logros obtenidos y progreso hacia el siguiente nivel.',
    
    /* Common */
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    close: 'Cerrar'
  },
  en: {
    /* Navigation */
    dashboard: 'Dashboard',
    recycle: 'Recycle',
    rankings: 'Rankings',
    history: 'History',
    approval: 'Approval',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    /* Login */
    loginTitle: 'EcoTrack',
    loginSubtitle: 'School Recycling System',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login',
    loginError: 'Incorrect username or password',
    
    /* Dashboard */
    welcomeTitle: 'Welcome to EcoTrack! 🌱',
    welcomeSubtitle: 'Together we are building a greener future, one recycling at a time.',
    welcomeMessage: 'Welcome to EcoTrack! 🌱',
    generalStats: 'General Statistics',
    totalMaterials: 'Total Materials',
    totalPoints: 'Total Points',
    activeStudents: 'Active Students',
    recyclingStats: 'Recycling Statistics',
    pending: 'Pending',
    students: 'Students',
    recyclings: 'Recyclings',
    errorLoadingData: 'Error: Could not load data',
    plastic: 'Plastic',
    paper: 'Paper',
    glass: 'Glass',
    metal: 'Metal',
    organic: 'Organic',
    
    /* Recycle Form */
    recycleTitle: 'Register Recycled Material',
    materialType: 'Material Type',
    selectMaterial: 'Select a material',
    packSize: 'Pack Size',
    selectSize: 'Select a size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    extraLarge: 'Extra Large',
    registerButton: 'Register',
    successMessage: 'Material registered successfully',
    
    /* Rankings */
    rankingsTitle: 'EcoTrack Rankings 🏆',
    studentRankings: 'Student Rankings',
    courseRankings: 'Course Rankings',
    student: 'Student',
    course: 'Course',
    points: 'Points',
    loadingRankings: 'Loading rankings...',
    errorLoadingRankings: 'Error: Could not load rankings data',
    discoverChampions: 'Discover who are the recycling champions!',
    individualRanking: 'Individual Ranking 👤',
    courseRanking: 'Course Ranking 🏫',
    pts: 'pts',
    pendingPoints: 'pending',
    
    /* History */
    historyTitle: 'Recycling History',
    date: 'Date',
    material: 'Material',
    size: 'Size',
    status: 'Status',
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected',
    noHistory: 'No history available',
    loadingHistory: 'Loading history...',
    errorLoadingHistory: 'Error: Could not load history data',
    recyclingHistory: 'Recycling History',
    all: 'All',
    confirmed: 'Approved',
    myHistory: 'My history',
    noRecordsMatch: 'No recycling records match the selected filters.',
    
    /* Approval Panel */
    approvalTitle: 'Approval Panel',
    pendingApprovals: 'Pending Approvals',
    approve: 'Approve',
    reject: 'Reject',
    noPendingApprovals: 'No pending approvals',
    
    /* Student Profile */
    profileTitle: 'My Profile',
    personalInfo: 'Personal Information',
    name: 'Name',
    email: 'Email',
    teacher: 'Teacher',
    myStats: 'My Statistics',
    myPoints: 'My Points',
    materialsRecycled: 'Materials Recycled',
    achievements: 'Achievements',
    myHistory: 'My History',
    
    /* Student Profile - Extended */
    accessDeniedStudents: 'Access denied. Students only.',
    course: 'Course',
    teacher: 'Teacher',
    notAssigned: 'Not assigned',
    ecoTrackPoints: 'EcoTrack Points',
    totalRecords: 'Total Records',
    totalWeight: 'Total Weight',
    materialTypes: 'Material Types',
    myRecyclingHistory: 'My Recycling History',
    noRecyclingRecords: 'You don\'t have any recycling records yet!',
    startRecyclingMessage: 'Start recycling to earn EcoTrack points',
    progressAndAchievements: 'Progress and Achievements',
    progressToNextLevel: 'Progress to next level',
    firstStep: 'First Step',
    fiftyPlusPoints: '50+ points',
    ecoWarrior: 'Eco Warrior',
    hundredPlusPoints: '100+ points',
    greenGuardian: 'Green Guardian',
    twoFiftyPlusPoints: '250+ points',
    ecoChampion: 'Eco Champion',
    fiveHundredPlusPoints: '500+ points',
    
    /* Achievements */
    ecoWarrior: 'Eco Warrior',
    ecoWarriorDesc: 'You have recycled more than 50 materials!',
    recyclingChampion: 'Recycling Champion',
    recyclingChampionDesc: 'You have reached 500 points!',
    greenLeader: 'Green Leader',
    greenLeaderDesc: 'You are in the top 10 of your course!',
    planetProtector: 'Planet Protector',
    planetProtectorDesc: 'You have recycled all types of materials!',
    
    /* Settings */
    settingsTitle: 'Settings',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved successfully',
    
    /* Notifications */
    materialApproved: 'Material approved',
    materialRejected: 'Material rejected',
    newAchievement: 'New achievement unlocked',
    
    /* Help Section */
    helpDashboard: '📊 Main Dashboard',
    helpRecycle: '♻️ Recycling Registration',
    helpApprove: '✅ Points Approval',
    helpRankings: '🏆 Rankings and Competitions',
    helpHistory: '📋 Activity History',
    helpProfile: '👤 My Personal Profile',
    helpDashboardDesc: 'Here you can see a summary of all recycling activities, total points and general statistics.',
    helpRecycleDesc: 'Register new recycling by selecting the student, material and pack size. Points will be pending approval.',
    helpApproveDesc: 'As the main validator, you can approve pending points from each course so they become confirmed points.',
    helpRankingsDesc: 'Check student and course rankings based on confirmed recycling points.',
    helpHistoryDesc: 'Review the complete history of all recycling activities with filters by status, student and date.',
    helpProfileDesc: 'Check your personal information, total points, recycling history, achievements earned and progress to the next level.',
    
    /* Common */
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('ecotrack-language');
    return savedLanguage || 'es';
  });

  useEffect(() => {
    localStorage.setItem('ecotrack-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;