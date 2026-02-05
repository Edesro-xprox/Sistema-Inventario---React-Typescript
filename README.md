# Sistema de Inventario - Frontend

Una aplicación web moderna y responsiva para la gestión de inventario de productos, desarrollada con React y DevExtreme.

## Descripción

Este proyecto es la interfaz de usuario (frontend) de un sistema integral de inventario. Proporciona una plataforma intuitiva para gestionar productos, marcas, modelos, proveedores, ubicaciones y tipos de equipos. Los usuarios pueden agregar, editar, eliminar y cambiar el estado de productos de manera eficiente.

## Características Principales

- **Autenticación de Usuarios** - Sistema de login seguro
- **Gestión de Productos** - CRUD completo para productos
  - Crear, leer, actualizar y eliminar productos
  - Cambiar estado activo/inactivo de productos
  - Filtrar y buscar productos
  
- **DataGrid Interactivo** - Tabla de datos avanzada con:
  - Paginación
  - Filtros por columna
  - Búsqueda en tiempo real
  - Botones de acción (Editar, Activar/Desactivar)

- **Formularios Avanzados** - Validación y captura de datos:
  - Campos de entrada de texto
  - Selectores desplegables
  - Campos numéricos
  - Selectores de fecha
  
- **Interfaz Moderna** - Diseño limpio y responsivo:
  - Tailwind CSS para estilos
  - Componentes DevExtreme profesionales
  - Responsive design para todos los dispositivos

- **Notificaciones** - Toast y Popups informativos
  - Mensajes de éxito/error
  - Confirmaciones de acciones

## 🛠️ Tecnologías Utilizadas

- **React 18.3** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de build ultra rápida
- **DevExtreme 22.2** - Componentes UI avanzados (DataGrid, Form, Popup, etc.)
- **Tailwind CSS 4.1** - Utilidades CSS para estilos
- **Axios** - Cliente HTTP para consumo de APIs
- **React Router 7.10** - Enrutamiento de páginas
- **ESLint** - Linter para código JavaScript/TypeScript
- **Heroicons** - Iconos SVG de alta calidad

## Requisitos Previos

Antes de iniciar, asegúrate de tener instalados:

- **Node.js** (v16.0.0 o superior)
- **npm** (v7.0.0 o superior) o **yarn**
- **Git**

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd inventory_front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3000/api
```

## Cómo Ejecutar

### Desarrollo
Para ejecutar la aplicación en modo desarrollo con hot reload:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Build para Producción
Para compilar la aplicación:
```bash
npm run build
```

### Vista Previa de Producción
Para ver cómo se vería en producción:
```bash
npm run preview
```

## Estructura del Proyecto

```
src/
├── api/
│   └── axios.instance.ts       # Configuración de cliente HTTP
├── assets/                      # Imágenes y recursos estáticos
├── components/
│   ├── ContentComponents/
│   │   └── SideBar.tsx         # Navegación lateral
│   ├── DevExtremme/
│   │   ├── DataGrid.tsx        # Tabla de datos
│   │   ├── FormComponent.tsx   # Formulario dinámico
│   │   ├── MultiView.tsx       # Contenedor de vistas
│   │   ├── Popup.tsx           # Modal/Popup personalizado
│   │   └── Toast.tsx           # Notificaciones
│   └── LoginComponents/         # Componentes de autenticación
├── hook/
│   ├── DataApi.tsx             # Hook para datos generales
│   └── ProductHook/
│       └── ProductApi.tsx      # Hook para productos
├── interfaces/
│   └── index.tsx               # Tipos y interfaces TypeScript
├── pages/
│   ├── Content.tsx             # Página principal/dashboard
│   ├── LoginPage.tsx           # Página de login
│   └── ProductPage.tsx         # Página de gestión de productos
├── services/
│   ├── auth.service.ts         # Servicio de autenticación
│   ├── data.service.ts         # Servicio de datos generales
│   └── product.service.ts      # Servicio de productos
├── App.tsx                      # Componente raíz
├── index.css                    # Estilos globales
└── main.tsx                     # Punto de entrada
```

## Autenticación

El sistema incluye un servicio de autenticación:
```typescript
// src/services/auth.service.ts
const login = async (credentials) => {
  // Petición POST al backend
};

const logout = async () => {
  // Limpiar sesión
};
```

**Última actualización:** Febrero 2026
**Versión:** 0.0.0
