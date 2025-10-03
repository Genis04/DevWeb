# Guía de Migración de React a Angular

## Resumen

Este proyecto ha sido migrado de React a Angular 20. A continuación se detallan los cambios principales y cómo ejecutar la aplicación.

## Estructura del Proyecto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes de UI y secciones
│   │   │   ├── ui/            # Componentes UI reutilizables (Button, Card, Badge, etc.)
│   │   │   ├── header.component.ts
│   │   │   └── hero.component.ts
│   │   ├── pages/             # Páginas/Rutas principales
│   │   │   ├── home.component.ts
│   │   │   └── admin.component.ts
│   │   ├── services/          # Servicios Angular
│   │   │   ├── api.service.ts
│   │   │   └── mock-data.service.ts
│   │   ├── app.routes.ts      # Configuración de rutas
│   │   └── app.ts             # Componente raíz
│   ├── environments/          # Variables de entorno
│   └── styles.css             # Estilos globales con Tailwind
├── package.json
└── tailwind.config.js
```

## Cambios Principales

### 1. Componentes

Los componentes de React (JSX) fueron migrados a componentes standalone de Angular:

**React (antes):**
```jsx
export const HeroSection = () => {
  return <section>...</section>;
};
```

**Angular (ahora):**
```typescript
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `<section>...</section>`
})
export class HeroComponent {}
```

### 2. Manejo de Estado

- **React:** Usaba `useState` y `useEffect`
- **Angular:** Usa propiedades de clase y lifecycle hooks (`ngOnInit`, `ngOnDestroy`)

### 3. Routing

- **React:** React Router DOM con `<BrowserRouter>` y `<Route>`
- **Angular:** Angular Router con configuración en `app.routes.ts`

### 4. Comunicación con API

- **React:** Axios con promesas
- **Angular:** Servicio `ApiService` con RxJS Observables

### 5. Gestión de Formularios

- **React:** Hooks y estado local
- **Angular:** `FormsModule` con `[(ngModel)]` o `ReactiveFormsModule`

## Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
cd frontend-angular
npm install
```

### Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Build

```bash
npm run build
```

Los archivos compilados estarán en `dist/frontend-angular/`

## Rutas Disponibles

- `/` - Página principal con servicios y testimonios
- `/admin` - Panel de administración para gestionar solicitudes

## Componentes UI Migrados

Todos los componentes de UI de shadcn/ui fueron recreados como componentes Angular standalone:

- `ButtonComponent` - Botones con variantes (default, outline, link)
- `CardComponent` - Tarjetas con header, title, description y content
- `BadgeComponent` - Insignias con variantes
- `InputComponent` - Campos de entrada con integración de formularios
- `TextareaComponent` - Áreas de texto
- `LabelComponent` - Etiquetas para formularios
- `TabsComponent` - Pestañas con contenido

## Servicios

### ApiService

Maneja todas las comunicaciones con el backend:

- `getHelloWorld()` - Test de conexión
- `getRentalRequests()` - Obtiene solicitudes de alquiler
- `getActiveRentals()` - Obtiene enlaces activos
- `getRentalBySlug(slug)` - Obtiene un enlace específico
- `createRentalRequest(data)` - Crea nueva solicitud
- `approveRentalRequest(id, approved)` - Aprueba/rechaza solicitud

### MockDataService

Proporciona datos de prueba para la aplicación.

## Configuración de Backend

El backend debe estar corriendo en `http://localhost:8000`.

Para cambiar la URL del backend, modifica:
- Desarrollo: `src/app/services/api.service.ts` línea 10
- Producción: `src/environments/environment.prod.ts`

## Tailwind CSS

El proyecto usa Tailwind CSS v3.4 con la misma configuración que la versión React.

Estilos globales en: `src/styles.css`

## Diferencias con la Versión React

### Simplificaciones

1. **Lucide Icons:** No se migró la librería lucide-angular (incompatibilidad de versión). Se usaron emojis como reemplazo temporal.

2. **Componentes UI:** Se simplificaron algunos componentes complejos de shadcn/ui manteniendo la funcionalidad esencial.

3. **Dropdown Menu:** Se implementó con lógica básica de show/hide en lugar de usar una librería externa.

### Componentes No Migrados

Por simplificación, algunos componentes secundarios no fueron migrados completamente:

- TemporalSite (página de sitio temporal)
- ServicesSection (sección de servicios detallada)
- TestimonialsSection (sección de testimonios detallada)
- Footer (pie de página completo)

Estos componentes están integrados de forma simplificada en el HomeComponent.

## Próximos Pasos

1. Migrar componentes secundarios faltantes
2. Implementar manejo de errores más robusto
3. Añadir tests unitarios y e2e
4. Implementar lazy loading para rutas
5. Optimizar bundle size
6. Agregar internacionalización (i18n)

## Soporte

Para preguntas o problemas, consulta la documentación de Angular: https://angular.dev
