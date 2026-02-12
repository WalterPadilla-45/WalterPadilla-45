# Rutas del Sistema de Encuestas ANEUPI

## 📋 Tabla de Rutas

### Rutas Públicas (Sin autenticación requerida)

| Ruta | Descripción | Funcionalidades |
|------|-------------|-----------------|
| `/user` | Página de inicio | Lista de encuestas activas, enlaces a login/registro |
| `/user/encuesta/evaluacion-servicios-2026` | Formulario de encuesta 1 | Responder "Evaluación de Servicios Financieros 2026" |
| `/user/encuesta/satisfaccion-inversiones` | Formulario de encuesta 2 | Responder "Satisfacción del Cliente - Productos de Inversión" |
| `/user/encuesta/gobierno-corporativo-2026` | Formulario de encuesta 3 | Responder "Encuesta de Gobierno Corporativo" |
| `/user/login` | Inicio de sesión | Login con usuarios de prueba |
| `/user/registro` | Registro de usuario | Crear nueva cuenta (rol PUBLICO) |

### Rutas Autenticadas - Usuario PUBLICO

| Ruta | Descripción | Requiere Rol |
|------|-------------|--------------|
| `/user/panel` | Panel personal | PUBLICO |
| `/user/perfil` | Perfil de usuario | PUBLICO / ACCIONISTA |

### Rutas Autenticadas - Usuario ACCIONISTA

| Ruta | Descripción | Requiere Rol |
|------|-------------|--------------|
| `/user/dashboard` | Dashboard de resultados | ACCIONISTA |

## 🔐 Usuarios de Prueba

Para probar el sistema, usa estas credenciales (simuladas):

```
Usuario Público:
Email: publico@example.com
Contraseña: cualquiera
→ Redirecciona a: /user/panel

Usuario Accionista:
Email: accionista@example.com
Contraseña: cualquiera
→ Redirecciona a: /user/dashboard
```

## 🚀 Cómo Ejecutar

```bash
# En la raíz del proyecto
cd /home/chuya/Cursos/Proyectos/aneupi-encuestas

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador
http://localhost:3000/user
```

## 📝 Flujos de Prueba Recomendados

### Flujo 1: Usuario Anónimo Responde Encuesta

```
1. Ir a http://localhost:3000/user
2. Click en "Responder Encuesta" de cualquier encuesta
3. Llenar el formulario (probar validaciones dejando campos vacíos)
4. Enviar respuestas → debe mostrar éxito
5. Intentar responder de nuevo → debe detectar voto duplicado
```

### Flujo 2: Registro y Panel de Usuario Público

```
1. Ir a http://localhost:3000/user
2. Click en "Registrarse"
3. Llenar formulario de registro
4. Automáticamente redirige a /user/panel
5. Explorar:
   - Tarjetas de resumen
   - Encuestas respondidas
   - Encuestas disponibles
   - Historial de donaciones
6. Click en "Ver mi perfil"
7. Editar nombre y guardar
```

### Flujo 3: Login como Accionista y Dashboard

```
1. Ir a http://localhost:3000/user/login
2. Email: accionista@example.com
3. Automáticamente redirige a /user/dashboard
4. Explorar:
   - Métricas generales (4 tarjetas)
   - Selector de encuestas
   - Gráficos de resultados (recharts)
   - Tablas de porcentajes
```

## 🎨 Verificación de Diseño

Al navegar por el sistema, verifica:

- ✅ Color principal: **#004563** (azul corporativo) en títulos, botones primarios
- ✅ Color secundario: **#eab356** (naranja) en botones secundarios, acentos
- ✅ Tipografía profesional y legible
- ✅ Sin elementos informales o colores chillones
- ✅ Tarjetas con sombras sutiles
- ✅ Transiciones suaves en botones y enlaces

## ⚠️ Nota sobre Build

Si ejecutas `npm run build`, puede haber un error relacionado con la configuración de Prisma (`prisma/schema.prisma`). Este archivo está fuera del alcance de `src/app/user` y `src/componentes/user`.

**Solución**: Ejecuta el proyecto solo en modo desarrollo con `npm run dev` para pruebas del frontend.

## 📂 Archivos Creados

Todos los archivos están organizados en:

```
src/app/user/           ← Páginas y lógica
src/componentes/user/   ← Componentes reutilizables
src/app/globals.css     ← Estilos institucionales
```

No se han modificado archivos fuera de estas rutas.
