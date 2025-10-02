import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Clock, Zap, Palette, Globe, ArrowRight, Star, CheckCircle, Phone, Mail, User, Building } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const RentalSection = () => {
  const [selectedDuration, setSelectedDuration] = useState('1 mes');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    duration: '1 mes',
    businessData: {
      description: '',
      services: [],
      theme: 'blue',
      socialLinks: {}
    }
  });
  
  const durations = [
    { period: "1 semana", price: "$150", popular: false },
    { period: "1 mes", price: "$400", popular: true },
    { period: "3 meses", price: "$1000", popular: false }
  ];
  
  const handleDurationSelect = (duration, price) => {
    setSelectedDuration(duration);
    setFormData(prev => ({ ...prev, duration }));
    setShowForm(true);
  };
  
  const handleInputChange = (field, value) => {
    if (field.startsWith('businessData.')) {
      const businessField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        businessData: {
          ...prev.businessData,
          [businessField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Process services string to array
      const processedData = {
        ...formData,
        businessData: {
          ...formData.businessData,
          services: formData.businessData.services || []
        }
      };
      
      const response = await axios.post(`${API}/rental-requests`, processedData);
      
      alert(`¡Solicitud enviada exitosamente! 
      
Hemos recibido tu solicitud para "${formData.businessName}".
ID de solicitud: ${response.data.id}
Duración: ${formData.duration}
Precio: ${durations.find(d => d.period === formData.duration)?.price}

Te contactaremos en las próximas 24 horas para activar tu enlace temporal.`);
      
      // Reset form
      setFormData({
        businessName: '',
        contactEmail: '',
        contactPhone: '',
        duration: '1 mes',
        businessData: {
          description: '',
          services: [],
          theme: 'blue',
          socialLinks: {}
        }
      });
      setShowForm(false);
      
    } catch (error) {
      console.error('Error submitting rental request:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="alquiler" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-4">
            ⚡ Servicio Exclusivo
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {mockData.rentalService.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {mockData.rentalService.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info and features */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockData.rentalService.features.map((feature, index) => {
                const icons = [Clock, Palette, Globe, Zap];
                const IconComponent = icons[index];
                const colors = ['blue', 'purple', 'green', 'orange'];
                const color = colors[index];
                
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`flex-shrink-0 w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.split(' ')[0]} {feature.split(' ')[1]}</h4>
                      <p className="text-sm text-gray-600">{feature}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Benefits */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestro servicio temporal?</h3>
              <ul className="space-y-3">
                {[
                  'Sin compromisos a largo plazo',
                  'Control total del tiempo de activación',
                  'Perfecto para eventos y promociones',
                  'Costo-efectivo para pruebas de mercado'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right side - Pricing cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Elige tu Plan Temporal</h3>
            
            <div className="space-y-4">
              {mockData.rentalService.durations.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                    plan.popular 
                      ? 'ring-2 ring-purple-500 shadow-2xl scale-105' 
                      : 'hover:shadow-xl'
                  }`}
                >
                  <CardHeader className="relative">
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Más Popular
                      </Badge>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold">{plan.period}</CardTitle>
                        <CardDescription>Acceso completo durante todo el período</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-600">{plan.price}</div>
                        <div className="text-sm text-gray-500">pago único</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      onClick={() => handleRentRequest(plan.period, plan.price)}
                      className={`w-full transition-all duration-300 ${
                        plan.popular
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-purple-600 text-gray-700 hover:text-white'
                      }`}
                    >
                      Solicitar {plan.period}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional info */}
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h4 className="font-semibold text-blue-900 mb-2">¿Necesitas más tiempo?</h4>
              <p className="text-blue-700 text-sm mb-4">
                Contáctanos para planes personalizados de hasta 6 meses
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Consultar Plan Personalizado
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};