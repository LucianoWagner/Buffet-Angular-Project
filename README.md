# ¿Qué Comemos? - Frontend (Angular) 🥗

Este proyecto es la interfaz de usuario para el sistema de administración del buffet de la Facultad de Informatica. Desarrollado con **Angular 17**, ofrece una experiencia moderna, reactiva y segura para administradores y usuarios.

---

## 🎥 Video Demostrativo

¡Mira el sistema en acción! Haz clic en la imagen de abajo para ver la demostración completa en YouTube:

[![Ver Demo en YouTube](https://img.youtube.com/vi/euIryP2ETmY/maxresdefault.jpg)](https://www.youtube.com/watch?v=euIryP2ETmY)

---

## 🚀 Tecnologías y Herramientas

- **Angular 17.3.0** (Framework principal)
- **Tailwind CSS** + **Flowbite** (Estilos y componentes UI)
- **RxJS** (Programación reactiva)
- **NGX-Charts** (Visualización de estadísticas)
- **Angular Router** (Navegación SPA)
- **Interceptors** (Manejo de tokens JWT y logs)

---

## 📂 Estructura del Proyecto

El proyecto está organizado de forma modular para facilitar el mantenimiento y la escalabilidad:

### Core & Layout
- **Core**: Contiene servicios globales, interceptores de autenticación y guards de seguridad.
- **Layout**: Definición de la estructura visual (Navbar, Sidebar, Footer).

### Módulos de Funcionalidad (`/modules`)
- **Auth**: Pantallas de Login y Registro de usuarios.
- **Home**: Dashboard principal y bienvenida.
- **Menu**: Visualización de la carta de comidas y detalles de menús.
- **Purchase**: Proceso de compra, selección de ítems y gestión de tickets.
- **Suggestion**: Interfaz para enviar y visualizar sugerencias.
- **Profile**: Gestión de datos personales y preferencias del usuario.
- **Admin**: Panel exclusivo para administradores (gestión de usuarios, menús y estadísticas).

---

## 🔐 Seguridad y Autenticación

- **Guards**: El acceso a las rutas está protegido según el rol del usuario (ADMIN, USUARIO, etc.).
- **Interceptors**: 
  - `AuthInterceptor`: Adjunta automáticamente el token JWT en cada petición al backend.
  - `LoggingInterceptor`: Facilita la depuración mediante el logueo de peticiones y respuestas.

---

## 📊 Visualización de Datos
Para el cumplimiento del **Punto F (Estadísticas)** del enunciado, se utiliza **NGX-Charts**, permitiendo visualizar de forma gráfica:
- Cantidad de menús vendidos (diario/semanal/mensual).
- Recaudación monetaria en tiempo real.

---

## 🛠️ Configuración e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/LucianoWagner/Buffet-Angular-Project.git
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar el Backend:**
    Asegúrate de que la URL de la API en `src/environments/environment.ts` sea la correcta:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8080/api/v1'
    };
    ```
4.  **Correr el proyecto:**
    ```bash
    npm start
    # O también:
    ng serve
    ```
    Navegar a `http://localhost:4200`.

---

## 📄 Proyecto Académico
Este frontend forma parte del Trabajo Final para la materia **Taller de Tecnologías de Producción de Software (TTPS)** - Opción Java.
