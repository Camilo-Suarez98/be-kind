# 📦 Dashboard de Categorías – Prueba Técnica Frontend

Este proyecto corresponde a una prueba técnica de Frontend, cuyo objetivo es construir un dashboard administrativo para la gestión de categorías, cumpliendo con buenas prácticas de arquitectura, estado global, control de acceso y QA funcional.

---

## 🛠️ Tecnologías utilizadas

- React + TypeScript
- Zustand (manejo de estado global)
- React Hook Form
- Fetch API
- CSS Modules
- React Router DOM

---

## 🔐 Autenticación y rutas protegidas

El dashboard se encuentra protegido mediante un sistema de **rutas privadas**.  
Solo los usuarios autenticados pueden acceder a las vistas administrativas.

### Escenario: acceso no autorizado al dashboard

**Precondición:**  
El usuario **NO ha iniciado sesión** (token inexistente o eliminado).

**Pasos:**
1. Abrir el navegador.
2. Acceder manualmente a la URL:
`http://localhost:5173/dashboard`

**Resultado esperado:**
- El usuario es redirigido automáticamente a la pantalla de **login**.
- No se renderiza ningún componente del dashboard.
- No se realizan peticiones a endpoints protegidos del API.

Este comportamiento asegura que la información sensible no sea accesible sin autenticación.

---

## 📋 Funcionalidades principales

- Login de usuario
- Protección de rutas privadas
- Listado de categorías
- Paginación
- Ordenamiento por columnas
- Búsqueda en frontend
- Creación de categorías mediante modal
- Subida de imagen (icono)
- Estados activo / inactivo
- Diseño responsive

---

## 🧪 QA Funcional

El proyecto incluye el archivo **`QA_CHECKLIST.md`**, el cual contiene pruebas funcionales del flujo completo:

- Login
- Acceso a rutas protegidas
- Listado de categorías
- Paginación
- Creación de categorías
- Manejo de estados vacíos y errores

---

## ⚠️ Ambigüedad intencional del API

El API no documenta explícitamente el payload requerido para la creación de categorías.  
Para resolver esta ambigüedad:

- Se inspeccionó la estructura de la respuesta del endpoint de listado.
- Se realizaron pruebas directas al endpoint de creación.
- Se implementó la subida de archivos cuando fue requerida.
- Las decisiones técnicas fueron documentadas en este README y reflejadas en la implementación.

---

## ▶️ Ejecución del proyecto

```bash
npm install
npm run dev
