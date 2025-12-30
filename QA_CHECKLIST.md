# QA_CHECKLIST.md

## QA Funcional – Dashboard de Categorías

Este checklist contiene las pruebas funcionales del flujo completo de la aplicación,
incluyendo autenticación, listado, paginación, búsqueda y creación de categorías.

---

## 1. Login

1. **Login exitoso**
   - Dado un usuario con credenciales válidas como se muestra a continuación:
     - Email: a.berrio@yopmail.com
     - Contraseña: AmuFK8G4Bh64Q1uX+IxQhw==
   - Entonces debe acceder al dashboard principal

2. **Login fallido**
   - Dado un usuario con credenciales inválidas
   - Entonces debe mostrarse un mensaje de error y no permitir el acceso

3. **Persistencia de sesión**
   - Dado un usuario autenticado
   - Cuando recarga la página
   - Entonces debe mantenerse la sesión activa

---

## 2. Sidebar y Navegación

4. **Visualización de sidebar**
   - La sidebar debe mostrarse fija y visible

5. **Cerrar sesión**
   - Al hacer click en “Cerrar sesión”
   - La sesión debe cerrarse y redirigir al login

---

## 3. Listado de Categorías

6. **Carga inicial del listado**
   - Al ingresar al dashboard de categorías
   - Se debe cargar el listado desde el API
   - Mostrar estado de loading mientras responde

7. **Listado vacío**
   - Si el API devuelve una lista vacía
   - Debe mostrarse el mensaje “No hay categorías”

---

## 4. Búsqueda (Filtro en Frontend)

8. **Búsqueda por nombre**
   - Al escribir texto en el input de búsqueda
   - La tabla debe filtrar las categorías por nombre
   - Sin realizar una nueva llamada al API

9. **Búsqueda sin resultados**
    - Si el texto ingresado no coincide con ningún registro
    - La tabla debe mostrar el estado vacío

---

## 5. Ordenamiento

10. **Ordenamiento por columnas**
    - Al hacer click en los encabezados de la tabla
    - Los registros deben ordenarse ascendente y descendente
    - El icono de orden debe cambiar correctamente

---

## 6. Paginación

11. **Cambio de página**
    - Al navegar entre páginas
    - Debe realizarse la llamada al API con el pageNumber correcto
    - Los datos deben actualizarse correctamente

12. **Cambio de resultados por página**
    - Al seleccionar 10, 20 o 50 resultados por página
    - El listado debe actualizarse según el valor seleccionado
    - Reiniciar la paginación a la primera página

13. **Botones de paginación deshabilitados**
    - En la primera página, los botones “previo” deben estar deshabilitados
    - En la última página, los botones “siguiente” deben estar deshabilitados

---

## 7. Creación de Categoría

14. **Apertura del modal**
    - Al hacer click en “Crear tipo de categoría”
    - Debe abrirse el modal correctamente

15. **Validación de formulario**
    - Si se envía el formulario incompleto
    - Deben mostrarse errores de validación

16. **Creación exitosa**
    - Al enviar datos válidos
    - Se debe crear la categoría
    - El modal debe cerrarse
    - El listado debe actualizarse

17. **Carga de imagen**
    - El input de icono solo debe permitir imágenes
    - No debe permitir archivos PDF u otros formatos

---

## 8. Estados y Errores

18. **Estado loading**
    - Durante cualquier petición al API
    - Debe mostrarse un indicador de carga

19. **Manejo de errores**
    - Si el API devuelve error
    - Debe mostrarse un mensaje de error amigable al usuario

## 9. Rutas protegidas

20. El usuario NO ha iniciado sesión (token inexistente o eliminado).

**Pasos:**
1. Abrir el navegador.
2. Acceder manualmente a la URL `/dashboard`.

**Resultado esperado:**
- El usuario es redirigido automáticamente a la pantalla de login.
- No se renderiza ningún componente del dashboard.
- No se realizan peticiones al API protegidas.

---

### Observaciones
- El endpoint de listado no soporta búsqueda por query, por lo que el filtrado se implementó en frontend.
- La carga de archivos se realizó mediante `FormData`.
- La estructura de carpetas y estado global se manejó con Zustand.