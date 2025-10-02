import React from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Phone, Facebook, Instagram, Mail, MapPin, Globe, Code, Heart } from 'lucide-react';
import { mockData } from '../mock';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const openContact = (type, value) => {
    switch(type) {
      case 'whatsapp':
        window.open(`https://wa.me/${value.replace(/\s+/g, '')}`, '_blank');
        break;
      case 'facebook':
        window.open(value, '_blank');
        break;
      case 'instagram':
        window.open(value, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      default:
        break;
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  WebDeveloper Pro
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Transformamos ideas en experiencias digitales excepcionales. 
                  Tu éxito online es nuestra misión.
                </p>
              </div>
              
              {/* Social links */}
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => openContact('whatsapp', mockData.contact.whatsapp)}
                  className="border-gray-700 text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => openContact('facebook', mockData.contact.facebook)}
                  className="border-gray-700 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => openContact('instagram', mockData.contact.instagram)}
                  className="border-gray-700 text-gray-300 hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all duration-300"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => openContact('email', mockData.contact.email)}
                  className="border-gray-700 text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Servicios</h4>
              <ul className="space-y-3">
                {mockData.services.map((service) => (
                  <li key={service.id}>
                    <a href="#servicios" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                      {service.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#alquiler" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                    Alquiler de Enlaces
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#inicio" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    Soporte
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{mockData.contact.whatsapp}</p>
                    <p className="text-xs text-gray-500">WhatsApp Business</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{mockData.contact.email}</p>
                    <p className="text-xs text-gray-500">Email comercial</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{mockData.contact.address}</p>
                    <p className="text-xs text-gray-500">Oficina principal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        {/* Bottom footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <Code className="w-4 h-4" />
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>por WebDeveloper Pro</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © {currentYear} WebDeveloper Pro. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};