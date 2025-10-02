import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, ShoppingCart, Store, Code2, ArrowRight, Check } from 'lucide-react';
import { mockData } from '../mock';

const iconMap = {
  Building2,
  ShoppingCart,
  Store,
  Code2
};

export const ServicesSection = () => {
  const scrollToContact = () => {
    // Simulate contact action with mock data
    alert('¡Gracias por tu interés! Te contactaremos pronto.');
  };
  
  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
            Nuestros Servicios
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Soluciones Web para
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Cada Tipo de Negocio
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde pequeños emprendimientos hasta grandes corporaciones, 
            tenemos la solución perfecta para tu presencia digital.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockData.services.map((service) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Features list */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price and CTA */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      <Badge variant="outline" className="text-xs">
                        Incluye hosting
                      </Badge>
                    </div>
                    
                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white group-hover:shadow-lg transition-all duration-300"
                    >
                      Solicitar Información
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Desarrollamos soluciones personalizadas para cada necesidad. 
            Cuéntanos tu proyecto y te ayudamos a hacerlo realidad.
          </p>
          <Button 
            size="lg"
            onClick={scrollToContact}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Consultoría Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};