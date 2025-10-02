import React, { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Phone, Facebook, Instagram, Mail, MapPin, ChevronDown } from 'lucide-react';
import { mockData } from '../mock';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WebDeveloper Pro
            </h1>
          </div>
          
          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('servicios')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('alquiler')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Alquiler de Enlaces
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonios
            </button>
          </nav>
          
          {/* Contact Dropdown */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Contáctanos
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem className="p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-500">{mockData.contact.whatsapp}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4">
                  <div className="flex items-center space-x-3">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-gray-500">@webdeveloper</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4">
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-gray-500">@webdeveloper</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-500">{mockData.contact.email}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-sm text-gray-500">{mockData.contact.address}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-gray-600 top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`} />
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {scrollToSection('inicio'); setIsMenuOpen(false);}}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Inicio
              </button>
              <button 
                onClick={() => {scrollToSection('servicios'); setIsMenuOpen(false);}}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Servicios
              </button>
              <button 
                onClick={() => {scrollToSection('alquiler'); setIsMenuOpen(false);}}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Alquiler de Enlaces
              </button>
              <button 
                onClick={() => {scrollToSection('testimonios'); setIsMenuOpen(false);}}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Testimonios
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};