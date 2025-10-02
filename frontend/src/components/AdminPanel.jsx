import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Globe, 
  Calendar, 
  Phone, 
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AdminPanel = () => {
  const [rentalRequests, setRentalRequests] = useState([]);
  const [activeRentals, setActiveRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, rentalsRes] = await Promise.all([
        axios.get(`${API}/rental-requests`),
        axios.get(`${API}/active-rentals`)
      ]);
      
      setRentalRequests(requestsRes.data);
      setActiveRentals(rentalsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (requestId, approved) => {
    try {
      await axios.post(`${API}/rental-requests/${requestId}/approve`, { approved });
      
      // Refresh data
      await fetchData();
      
      alert(approved ? 'Solicitud aprobada exitosamente' : 'Solicitud rechazada');
    } catch (error) {
      console.error('Error processing approval:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pendiente' },
      active: { color: 'bg-green-100 text-green-800', text: 'Activo' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rechazado' },
      expired: { color: 'bg-gray-100 text-gray-800', text: 'Expirado' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona solicitudes y enlaces temporales activos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="requests">Solicitudes</TabsTrigger>
            <TabsTrigger value="active">Enlaces Activos</TabsTrigger>
          </TabsList>

          {/* Rental Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Solicitudes de Alquiler</h2>
              <Button onClick={fetchData} variant="outline">
                Actualizar
              </Button>
            </div>
            
            {rentalRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay solicitudes pendientes</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {rentalRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{request.businessName}</CardTitle>
                          <p className="text-gray-600 mt-1">{request.duration} - {request.price}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{request.contactEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{request.contactPhone}</span>
                        </div>
                      </div>
                      
                      {/* Business Description */}
                      {request.businessData?.description && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Descripción:</h4>
                          <p className="text-gray-700 text-sm">{request.businessData.description}</p>
                        </div>
                      )}
                      
                      {/* Request Details */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Solicitado: {formatDate(request.requestDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <span>Slug: /{request.uniqueSlug}</span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      {request.status === 'pending' && (
                        <div className="flex space-x-3 pt-4 border-t">
                          <Button
                            onClick={() => handleApproval(request.id, true)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aprobar
                          </Button>
                          <Button
                            onClick={() => handleApproval(request.id, false)}
                            variant="outline"
                            className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Rentals Tab */}
          <TabsContent value="active" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Enlaces Temporales Activos</h2>
              <Button onClick={fetchData} variant="outline">
                Actualizar
              </Button>
            </div>
            
            {activeRentals.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay enlaces activos</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeRentals.map((rental) => (
                  <Card key={rental.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{rental.businessName}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Globe className="h-4 w-4" />
                              <span>/rental/{rental.slug}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Expira: {formatDate(rental.expirationDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/rental/${rental.slug}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Ver Sitio
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};