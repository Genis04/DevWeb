export const mockData = {
  services: [
    {
      id: 1,
      title: "Desarrollo Web Corporativo",
      description: "Sitios web profesionales que reflejan la identidad de tu empresa con diseños modernos y funcionalidad avanzada.",
      features: ["Diseño responsive", "Optimización SEO", "Panel de administración", "Integración con CRM"],
      icon: "Building2",
      price: "Desde $2,500"
    },
    {
      id: 2,
      title: "Tiendas Online",
      description: "E-commerce completos con pasarelas de pago, gestión de inventario y herramientas de marketing digital.",
      features: ["Carrito de compras", "Pasarelas de pago", "Gestión de inventario", "Analytics integrado"],
      icon: "ShoppingCart",
      price: "Desde $3,200"
    },
    {
      id: 3,
      title: "Sitios para Pequeños Negocios",
      description: "Soluciones web accesibles y efectivas para emprendedores y pequeñas empresas que buscan presencia digital.",
      features: ["Diseño profesional", "Formularios de contacto", "Galería de productos", "Mapa de ubicación"],
      icon: "Store",
      price: "Desde $800"
    },
    {
      id: 4,
      title: "Aplicaciones Web",
      description: "Desarrollo de aplicaciones web personalizadas para optimizar procesos y mejorar la productividad.",
      features: ["Desarrollo a medida", "Base de datos", "API integrations", "Dashboard admin"],
      icon: "Code2",
      price: "Desde $4,500"
    }
  ],
  
  rentalService: {
    title: "Alquiler de Enlaces Temporales",
    description: "Obtén una presencia web inmediata con nuestro servicio de enlaces temporales. Ideal para eventos, promociones o lanzamientos.",
    features: [
      "Configuración en 24 horas",
      "Diseño adaptable a tu marca",
      "Dominio personalizado disponible",
      "Gestión de contenido fácil"
    ],
    durations: [
      { period: "1 semana", price: "$150", popular: false },
      { period: "1 mes", price: "$400", popular: true },
      { period: "3 meses", price: "$1,000", popular: false }
    ]
  },
  
  contact: {
    whatsapp: "+52 55 1234 5678",
    facebook: "https://facebook.com/webdeveloper",
    instagram: "https://instagram.com/webdeveloper",
    email: "contacto@webdeveloper.com",
    address: "Ciudad de México, México"
  },
  
  testimonials: [
    {
      id: 1,
      name: "María González",
      company: "Boutique Elena",
      text: "Transformaron completamente mi negocio online. Las ventas aumentaron un 300% desde el lanzamiento.",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      company: "Consultora Mendoza",
      text: "Profesionales excepcionales. El sitio web corporativo superó todas nuestras expectativas.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Ruiz",
      company: "Café Central",
      text: "El servicio de enlace temporal fue perfecto para nuestro evento especial. Fácil y efectivo.",
      rating: 5
    }
  ]
};