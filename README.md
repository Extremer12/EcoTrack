# EcoTrack - Sistema de Gestión de Reciclaje

## Descripción

EcoTrack es una aplicación web desarrollada en React que permite gestionar y rastrear actividades de reciclaje. Los usuarios pueden registrar materiales reciclados, ganar puntos, y participar en un sistema de rankings.

## Características

- 📊 **Dashboard interactivo** con estadísticas de reciclaje
- ♻️ **Registro de materiales** con diferentes tamaños de packs
- 🏆 **Sistema de puntos y rankings** individual y por cursos
- 📋 **Panel de aprobación** para validar registros
- 📈 **Historial de actividades** con filtros
- 👤 **Perfil personal de estudiantes** con estadísticas y logros
- 🎯 **Sistema de logros** con niveles desbloqueables
- 🔔 **Sistema de notificaciones** mejorado y legible
- 🎨 **Interfaz moderna** con animaciones y diseño responsive
- 👥 **Sistema multi-rol** (estudiantes, profesores, administradores)

## Tecnologías Utilizadas

- React 18
- Tailwind CSS
- Context API para gestión de estado
- Componentes modulares

## Estructura del Proyecto

```
EcoTrack/
├── components/          # Componentes React
│   ├── AppContent.jsx   # Contenido principal de la app
│   ├── Dashboard.jsx    # Panel de estadísticas
│   ├── RecycleForm.jsx  # Formulario de registro
│   ├── ApprovalPanel.jsx # Panel de aprobación
│   ├── Rankings.jsx     # Sistema de rankings
│   ├── History.jsx      # Historial de actividades
│   ├── StudentProfile.jsx # Perfil personal de estudiantes
│   ├── Login.jsx        # Componente de login
│   └── Icons.jsx        # Iconos SVG
├── contexts/            # Contextos de React
│   ├── EcoTrackContext.jsx # Estado principal
│   └── NotificationContext.jsx # Notificaciones
├── data/                # Datos mock
│   └── mockData.js      # Datos de ejemplo
├── utils/               # Utilidades
├── src/                 # Archivos de entrada
│   ├── index.js         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos públicos
│   └── index.html       # HTML base
└── App.jsx              # Componente principal
```

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/EcoTrack.git
cd EcoTrack
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre tu navegador en `http://localhost:3000`

## Uso

### Para Estudiantes
1. Inicia sesión con tu nombre de usuario
2. Registra materiales reciclados desde el formulario
3. Selecciona el tipo de material y tamaño del pack
4. Visualiza tus estadísticas en el dashboard
5. Consulta tu posición en los rankings
6. Accede a tu perfil personal para ver logros y progreso
7. Revisa tu historial personal de reciclaje

### Para Profesores/Validadores
1. Registra materiales reciclados de los estudiantes
2. Selecciona el estudiante y tipo de material
3. Asigna puntos según el tamaño del pack

### Para Administradores
1. Accede al panel de aprobación
2. Revisa y aprueba los registros pendientes
3. Gestiona los puntos asignados
4. Monitorea el progreso general

## Materiales Soportados

- **Plástico** (PET, HDPE, etc.)
- **Papel** (Periódicos, cartón, etc.)
- **Vidrio** (Botellas, frascos, etc.)
- **Metal** (Latas, aluminio, etc.)
- **Electrónicos** (Dispositivos, componentes, etc.)

## Tamaños de Packs

- **Pequeño**: 10-50 puntos
- **Mediano**: 60-100 puntos  
- **Grande**: 120-200 puntos

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Proyecto desarrollado para la gestión de reciclaje educativo.

---

¡Gracias por contribuir al cuidado del medio ambiente! 🌱