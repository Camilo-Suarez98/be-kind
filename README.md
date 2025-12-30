# 📦 Dashboard de Categorías – Prueba Técnica Frontend

Este proyecto hace parte de una prueba técnica de Frontend cuyo objetivo es construir un dashboard administrativo para la gestión de categorías.

---

## 🛠️ Tecnologías y librerías utilizadas

- **React + TypeScript**  
  Tipado estático para mejorar la mantenibilidad y prevenir errores.

- **Zustand**  
  Para el manejo de estado global.

- **React Hook Form**  
  Manejo de formularios con validaciones.

- **Fetch API**  
  Consumo de endpoints HTTP.

- **React Router DOM**  
  Manejo de rutas.

- **CSS Modules**  
  Encapsulación de estilos por componente.

- **React Icons**  
  Uso de iconos.

---

## 🔐 Autenticación y rutas protegidas

El dashboard está protegido mediante un sistema de **rutas privadas**.  
El acceso a las vistas administrativas solo está permitido a usuarios autenticados mediante el token almacenado en localStorage.

### Escenario: acceso no autorizado al dashboard

**Precondición:**  
El usuario **NO ha iniciado sesión** (token inexistente o eliminado).

**Pasos:**
1. Abrir el navegador.
2. Acceder a la URL:
`/dashboard`


**Resultado esperado:**
- El usuario es redirigido automáticamente a la pantalla de **login**.
- No se renderiza ningún componente del dashboard.
- No se realizan peticiones a endpoints protegidos del API.

---

## 📋 Funcionalidades principales

- Login de usuario
- Protección de rutas
- Listado de categorías
- Paginación dinámica (10, 20, 50)
- Ordenamiento por columnas
- Búsqueda en frontend
- Creación de categorías mediante modal
- Subida de imagen (icono)
- Estados activo / inactivo

---

## 🧪 QA Funcional

Se incluye el archivo **`QA_CHECKLIST.md`**, el cual contiene al menos 10 pruebas funcionales del flujo completo:

- Login
- Acceso a rutas protegidas
- Listado de categorías
- Paginación
- Búsqueda
- Creación de categorías
- Manejo de errores
- Estados vacíos

---

## 🧠 Decisiones técnicas

- El estado global de categorías se manejó en Zustand para facilitar la paginación y el refresco del listado.
- La búsqueda se implementó en frontend debido a que el endpoint no soporta query de búsqueda.
- La paginación se sincroniza entre UI y API utilizando `pageNumber` y `pageSize`.

---

## 📌 Supuestos asumidos

- El token de autenticación se almacena en `localStorage`.
- Un usuario sin token no debe realizar llamadas a endpoints protegidos.
- El backend controla la paginación y devuelve `totalElements` y `totalPages`.
- El campo `status` representa:
- `1` → Activo
- `0` → Inactivo
- El campo `icon` corresponde a una URL devuelta por el API luego del upload.

---

## ▶️ Ejecución del proyecto

```bash
npm install
npm run dev
