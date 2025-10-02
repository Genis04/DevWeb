# API Contracts - Sistema de Alquiler de Enlaces Temporales

## Backend Models

### RentalRequest (Solicitud de Alquiler)
```javascript
{
  id: String (UUID),
  businessName: String,
  contactEmail: String,
  contactPhone: String,
  duration: String, // "1 week", "1 month", "3 months"
  durationType: String, // "week", "month"
  durationValue: Number, // 1, 3, etc
  price: String,
  status: String, // "pending", "active", "expired", "cancelled"
  requestDate: DateTime,
  approvalDate: DateTime (opcional),
  expirationDate: DateTime (opcional),
  uniqueSlug: String, // URL única para el negocio
  businessData: {
    description: String,
    services: [String],
    logo: String (opcional),
    theme: String, // color theme
    socialLinks: Object
  },
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### ActiveRental (Enlace Activo)
```javascript
{
  id: String (UUID),
  rentalRequestId: String, // referencia a RentalRequest
  slug: String, // URL única /rental/{slug}
  businessName: String,
  businessData: Object, // contenido del sitio
  expirationDate: DateTime,
  isActive: Boolean,
  createdAt: DateTime,
  lastAccessed: DateTime
}
```

## API Endpoints

### POST /api/rental-requests
**Crear solicitud de alquiler**
- Input: { businessName, contactEmail, contactPhone, duration, businessData }
- Output: RentalRequest object
- Mock removal: Reemplazar alert() en RentalSection.jsx

### GET /api/rental-requests
**Listar todas las solicitudes (admin)**
- Output: Array de RentalRequest

### POST /api/rental-requests/:id/approve
**Aprobar solicitud y crear enlace activo**
- Input: { approved: boolean }
- Output: ActiveRental object si aprobado

### GET /api/active-rentals
**Listar enlaces activos**
- Output: Array de ActiveRental

### GET /api/rental/:slug
**Obtener sitio temporal por slug**
- Output: ActiveRental data o 404 si expirado
- Frontend: Nueva ruta para mostrar sitio temporal

### DELETE /api/active-rentals/:id
**Eliminar enlace (expiración automática)**
- Ejecutar por cron job o middleware

## Frontend Integration Changes

### RentalSection.jsx
- Remover `handleRentRequest` con alert()
- Agregar form con campos: businessName, contactEmail, contactPhone, businessData
- Llamar POST /api/rental-requests
- Mostrar confirmación de solicitud enviada

### Nueva página: TemporalSite.jsx
- Ruta: /rental/:slug
- Fetch data de GET /api/rental/:slug
- Renderizar sitio temporal con businessData
- Manejar caso de enlace expirado

### Admin panel (opcional)
- Listar solicitudes pendientes
- Aprobar/rechazar solicitudes
- Ver enlaces activos

## Mock Data Removal
- mock.js: Mantener solo servicios y testimonios
- Remover mockData.rentalService.durations
- Remover alerts en botones de solicitud

## Automatic Expiration System
- Middleware en cada request para verificar fechas
- Cron job cada hora para limpiar enlaces expirados
- Soft delete vs hard delete según necesidad

## Business Logic
1. Usuario llena formulario → POST /api/rental-requests
2. Admin aprueba → POST /api/rental-requests/:id/approve
3. Sistema crea ActiveRental con slug único
4. Enlace /rental/:slug funciona hasta expirationDate
5. Sistema elimina automáticamente al expirar

## Database Collections
- rental_requests
- active_rentals