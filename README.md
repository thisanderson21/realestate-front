# Million Real Estate Frontend

Una aplicación web moderna para la exploración y búsqueda de propiedades inmobiliarias en el sur de Florida, desarrollada con Next.js 15 y React 19.

## 🏠 Descripción

Million Real Estate es una plataforma web que permite a los usuarios explorar, buscar y filtrar propiedades inmobiliarias. La aplicación ofrece una experiencia de usuario fluida con funcionalidades avanzadas de búsqueda, filtros por rango de precios y navegación optimizada.

## ✨ Características Principales

- **🔍 Búsqueda Inteligente**: Búsqueda en tiempo real con debounce para optimizar el rendimiento
- **💰 Filtros por Precio**: Selector de rango de precios interactivo
- **🏘️ Listado de Propiedades**: Visualización clara de propiedades con información detallada
- **📱 Diseño Responsivo**: Interfaz adaptada para dispositivos móviles y desktop
- **⚡ Rendimiento Optimizado**: Caché inteligente y carga lazy para mejorar la experiencia
- **🧪 Testing Completo**: Cobertura de pruebas unitarias con Jest y Testing Library

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Sass/SCSS** - Preprocesador CSS para estilos modulares

### Gestión de Estado y Datos
- **TanStack Query (React Query)** - Gestión de estado del servidor y caché
- **Inversify** - Inyección de dependencias para arquitectura limpia
- **Axios** - Cliente HTTP para comunicación con APIs

### UI/UX
- **Framer Motion** - Animaciones fluidas y transiciones
- **Lottie React** - Animaciones vectoriales para estados vacíos
- **React Paginate** - Paginación optimizada
- **use-debounce** - Optimización de búsquedas en tiempo real

### Testing
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **Jest Environment JSDOM** - Entorno de testing para DOM

### Herramientas de Desarrollo
- **ESLint** - Linting y formateo de código
- **Turbopack** - Bundler ultra-rápido para desarrollo

## 🏗️ Arquitectura

La aplicación sigue una arquitectura limpia y modular:

```
src/
├── app/                    # App Router de Next.js
│   ├── detail/[id]/       # Páginas dinámicas de detalle
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes organizados por atomic design
│   ├── features/          # Componentes de funcionalidades
│   ├── ui/                # Componentes de interfaz reutilizables
│   └── providers/         # Proveedores de contexto
├── services/              # Capa de servicios y repositorios
│   ├── repositories/      # Patrón Repository para datos
│   └── inversify.conf.ts  # Configuración de inyección de dependencias
├── hooks/                 # Custom hooks personalizados
├── helpers/               # Utilidades y funciones auxiliares
├── styles/                # Estilos globales y temas
└── types/                 # Definiciones de tipos TypeScript
```

### Patrones de Diseño Implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Dependency Injection**: Con Inversify para desacoplamiento
- **Atomic Design**: Organización de componentes por complejidad
- **Custom Hooks**: Lógica reutilizable encapsulada

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/thisanderson21/realestate-front
   cd real-estate-front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.development
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con Turbopack

# Producción
npm run build        # Construcción optimizada para producción
npm run start        # Servidor de producción

# Testing
npm run test         # Ejecutar tests con cobertura
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con reporte de cobertura

# Linting
npm run lint         # Verificar código con ESLint
```

## 🧪 Testing

La aplicación incluye una suite completa de testing:

```bash
# Ejecutar todos los tests
npm run test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch para desarrollo
npm run test:watch
```

### Cobertura de Tests
- **Componentes**: Testing de renderizado y comportamiento
- **Hooks**: Testing de lógica personalizada
- **Servicios**: Testing de repositorios y API calls
- **Utilidades**: Testing de funciones auxiliares


## 🔧 Configuración de Desarrollo


### ESLint Configuration
El proyecto utiliza ESLint con configuración Next.js para mantener estándares de código.

## 📱 Funcionalidades de la Aplicación

### Página Principal
- Listado de propiedades con datos iniciales del servidor
- Filtros de búsqueda en tiempo real
- Selector de rango de precios
- Estados de carga y error manejados

### Página de Detalle
- Vista detallada de propiedades individuales
- Generación estática de páginas (SSG)
- SEO optimizado con metadatos

### Búsqueda y Filtros
- **Búsqueda por texto**: Nombre y dirección de propiedades
- **Filtro por precio**: Rango mínimo y máximo
- **Debounce**: Optimización de requests (500ms)
- **Caché inteligente**: React Query para gestión de estado

## 🌐 API Integration

La aplicación se conecta con una API REST para obtener datos de propiedades:

```typescript
// Endpoint principal
GET /api/Properties?search={term}&minPrice={min}&maxPrice={max}
```

### Gestión de Estado del Servidor
- **React Query**: Caché automático y sincronización
- **Placeholder Data**: Datos iniciales para mejor UX
- **Optimistic Updates**: Actualizaciones optimistas cuando sea apropiado

## 📈 Optimizaciones de Rendimiento

- **Turbopack**: Bundling ultra-rápido en desarrollo
- **Lazy Loading**: Carga diferida de componentes
- **Image Optimization**: Optimización automática con Next.js Image
- **Code Splitting**: División automática de código
- **Caché Inteligente**: 5 minutos de stale time, 10 minutos de garbage collection

## 🔒 Seguridad

- **TypeScript**: Tipado estático para prevenir errores
- **ESLint**: Análisis estático de código
- **Sanitización**: Validación de inputs del usuario
- **HTTPS**: Configuración segura para producción

## 📄 Licencia

Este proyecto es privado y está destinado para uso interno de Million Real Estate.

## 👨‍💻 Autor

**Anderson Sepúlveda**  
Proyecto desarrollado como **prueba técnica**.  

📧 **andersonvargas383@gmail.com**