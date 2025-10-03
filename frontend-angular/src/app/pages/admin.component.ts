import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../components/ui/card.component';
import { ButtonComponent } from '../components/ui/button.component';
import { BadgeComponent } from '../components/ui/badge.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, ButtonComponent, BadgeComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p class="text-gray-600 mt-2">Gestiona solicitudes y enlaces temporales activos</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-8">
          <div class="flex gap-4 mb-6">
            <button
              (click)="activeTab = 'requests'"
              [class]="'px-4 py-2 rounded-lg font-medium ' + (activeTab === 'requests' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700')"
            >
              Solicitudes
            </button>
            <button
              (click)="activeTab = 'active'"
              [class]="'px-4 py-2 rounded-lg font-medium ' + (activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700')"
            >
              Enlaces Activos
            </button>
          </div>

          <div *ngIf="activeTab === 'requests'">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold">Solicitudes de Alquiler</h2>
              <app-button variant="outline" (click)="fetchData()">Actualizar</app-button>
            </div>

            <div *ngIf="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p class="text-gray-600">Cargando...</p>
            </div>

            <app-card *ngIf="!loading && rentalRequests.length === 0">
              <app-card-content className="p-8 text-center">
                <p class="text-gray-600">No hay solicitudes pendientes</p>
              </app-card-content>
            </app-card>

            <div *ngIf="!loading" class="space-y-4">
              <app-card *ngFor="let request of rentalRequests" className="hover:shadow-lg transition-shadow">
                <app-card-header>
                  <div class="flex justify-between items-start">
                    <div>
                      <app-card-title>{{request.businessName}}</app-card-title>
                      <p class="text-gray-600 mt-1">{{request.duration}} - {{request.price}}</p>
                    </div>
                    <app-badge [className]="getStatusClass(request.status)">
                      {{getStatusText(request.status)}}
                    </app-badge>
                  </div>
                </app-card-header>

                <app-card-content>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="text-sm">✉️ {{request.contactEmail}}</p>
                      </div>
                      <div>
                        <p class="text-sm">📱 {{request.contactPhone}}</p>
                      </div>
                    </div>

                    <div *ngIf="request.status === 'pending'" class="flex gap-3 pt-4 border-t">
                      <app-button
                        (click)="handleApproval(request.id, true)"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        ✓ Aprobar
                      </app-button>
                      <app-button
                        (click)="handleApproval(request.id, false)"
                        variant="outline"
                        className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                      >
                        ✗ Rechazar
                      </app-button>
                    </div>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          </div>

          <div *ngIf="activeTab === 'active'">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-bold">Enlaces Temporales Activos</h2>
              <app-button variant="outline" (click)="fetchData()">Actualizar</app-button>
            </div>

            <div *ngIf="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p class="text-gray-600">Cargando...</p>
            </div>

            <app-card *ngIf="!loading && activeRentals.length === 0">
              <app-card-content className="p-8 text-center">
                <p class="text-gray-600">No hay enlaces activos</p>
              </app-card-content>
            </app-card>

            <div *ngIf="!loading" class="space-y-4">
              <app-card *ngFor="let rental of activeRentals">
                <app-card-content className="p-6">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold text-lg">{{rental.businessName}}</h3>
                      <p class="text-sm text-gray-600 mt-2">🌐 /rental/{{rental.slug}}</p>
                      <p class="text-sm text-gray-600">📅 Expira: {{rental.expirationDate | date:'short'}}</p>
                    </div>
                    <app-button variant="outline" size="sm" (click)="openRental(rental.slug)">
                      🔗 Ver Sitio
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  rentalRequests: any[] = [];
  activeRentals: any[] = [];
  loading = true;
  activeTab = 'requests';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;

    Promise.all([
      this.apiService.getRentalRequests().toPromise(),
      this.apiService.getActiveRentals().toPromise()
    ]).then(([requestsRes, rentalsRes]) => {
      this.rentalRequests = requestsRes?.data || [];
      this.activeRentals = rentalsRes?.data || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching data:', error);
      this.loading = false;
    });
  }

  handleApproval(requestId: string, approved: boolean): void {
    this.apiService.approveRentalRequest(requestId, approved).subscribe({
      next: () => {
        this.fetchData();
        alert(approved ? 'Solicitud aprobada exitosamente' : 'Solicitud rechazada');
      },
      error: (error) => {
        console.error('Error processing approval:', error);
        alert('Error al procesar la solicitud');
      }
    });
  }

  openRental(slug: string): void {
    window.open(`/rental/${slug}`, '_blank');
  }

  getStatusClass(status: string): string {
    const statusClasses: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return statusClasses[status] || statusClasses.pending;
  }

  getStatusText(status: string): string {
    const statusTexts: any = {
      pending: 'Pendiente',
      active: 'Activo',
      rejected: 'Rechazado',
      expired: 'Expirado'
    };
    return statusTexts[status] || 'Pendiente';
  }
}
