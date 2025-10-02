import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Globe, ExternalLink, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const TemporalSite = () => {
  const { slug } = useParams();
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(`${API}/rental/${slug}`);
        setSiteData(response.data);
        
        // Calculate time left
        const expiration = new Date(response.data.expirationDate);
        const now = new Date();
        const timeDiff = expiration.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          setTimeLeft(timeDiff);
        }
      } catch (err) {
        console.error('Error fetching site data:', err);
        setError(err.response?.status === 404 ? 'expired' : 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, [slug]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1000;
          return newTime > 0 ? newTime : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTimeLeft = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} días, ${hours} horas`;
    } else if (hours > 0) {
      return `${hours} horas, ${minutes} minutos`;
    } else {
      return `${minutes} minutos`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando sitio temporal...</p>
        </div>
      </div>
    );
  }

  if (error === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Enlace Expirado</h1>
            <p className="text-gray-600 mb-6">
              Este enlace temporal ha expirado o no existe. 
              Si necesitas renovar tu enlace, contacta con nosotros.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error al Cargar</h1>
            <p className="text-gray-600 mb-6">
              No se pudo cargar el sitio temporal. Por favor, inténtalo de nuevo.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getThemeColors = (theme) => {
    const themes = {
      blue: 'from-blue-600 to-blue-700',
      purple: 'from-purple-600 to-purple-700', 
      green: 'from-green-600 to-green-700',
      red: 'from-red-600 to-red-700',
      orange: 'from-orange-600 to-orange-700'
    };
    return themes[theme] || themes.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with expiration notice */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">
              Sitio Temporal - Expira en: {timeLeft > 0 ? formatTimeLeft(timeLeft) : 'Expirado'}
            </span>
          </div>
          <Badge variant="outline" className="border-yellow-600 text-yellow-700">
            <Globe className="h-3 w-3 mr-1" />
            /{slug}
          </Badge>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className={`bg-gradient-to-r ${getThemeColors(siteData.businessData?.theme)} rounded-3xl text-white p-12 mb-12 text-center`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {siteData.businessName}
          </h1>
          {siteData.businessData?.description && (
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              {siteData.businessData.description}
            </p>
          )}
        </div>

        {/* Services section */}
        {siteData.businessData?.services && siteData.businessData.services.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Nuestros Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.businessData.services.map((service, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{service}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Contactanos</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              ¿Interesado en nuestros servicios? ¡Contáctanos para más información!
            </p>
            
            {/* Social links */}
            {siteData.businessData?.socialLinks && Object.keys(siteData.businessData.socialLinks).length > 0 && (
              <div className="flex justify-center space-x-4 mb-6">
                {Object.entries(siteData.businessData.socialLinks).map(([platform, link]) => (
                  <Button
                    key={platform}
                    variant="outline"
                    onClick={() => window.open(link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Button>
                ))}
              </div>
            )}

            <div className="bg-gray-100 rounded-lg p-6 inline-block">
              <p className="text-sm text-gray-600 mb-2">Para contactar directamente:</p>
              <p className="font-semibold text-lg">{siteData.businessName}</p>
              <p className="text-gray-600">Sitio temporal activo hasta: {new Date(siteData.expirationDate).toLocaleDateString('es-ES')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Sitio temporal creado por <strong>WebDeveloper Pro</strong>
          </p>
          <Button 
            variant="link" 
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-700"
          >
            ¿Quieres tu propio sitio temporal? Solicítalo aquí
          </Button>
        </div>
      </div>
    </div>
  );
};"