import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header.component';
import { HeroComponent } from '../components/hero.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent],
  template: `
    <div class="min-h-screen bg-white">
      <app-header></app-header>
      <main>
        <app-hero></app-hero>

        <section id="servicios" class="py-24 bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Nuestros Servicios
              </h2>
              <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones web profesionales para cada tipo de negocio
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div *ngFor="let service of services" class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                <div class="text-4xl mb-4">{{service.icon}}</div>
                <h3 class="text-xl font-bold mb-2">{{service.title}}</h3>
                <p class="text-gray-600 mb-4">{{service.description}}</p>
                <div class="text-2xl font-bold text-blue-600">{{service.price}}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="alquiler" class="py-24 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Alquiler de Enlaces Temporales
              </h2>
              <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Obtén una presencia web inmediata
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div *ngFor="let duration of durations" class="border rounded-lg p-6 hover:shadow-xl transition-all">
                <h3 class="text-2xl font-bold mb-2">{{duration.period}}</h3>
                <div class="text-3xl font-bold text-purple-600 mb-4">{{duration.price}}</div>
                <button class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Solicitar
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonios" class="py-24 bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Testimonios
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div *ngFor="let testimonial of testimonials" class="bg-white rounded-lg shadow-lg p-8">
                <div class="flex mb-4">
                  <span *ngFor="let star of [1,2,3,4,5]" class="text-yellow-400">⭐</span>
                </div>
                <p class="text-gray-700 mb-6 italic">"{{testimonial.text}}"</p>
                <div>
                  <h4 class="font-semibold">{{testimonial.name}}</h4>
                  <p class="text-sm text-gray-600">{{testimonial.company}}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="bg-gray-900 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h3 class="text-2xl font-bold mb-4">WebDeveloper Pro</h3>
            <p class="text-gray-300">Transformamos ideas en experiencias digitales excepcionales</p>
            <p class="text-gray-400 mt-8">© 2025 WebDeveloper Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class HomeComponent implements OnInit {
  services = [
    {
      icon: '🏢',
      title: 'Desarrollo Web Corporativo',
      description: 'Sitios web profesionales',
      price: 'Desde $2,500'
    },
    {
      icon: '🛒',
      title: 'Tiendas Online',
      description: 'E-commerce completos',
      price: 'Desde $3,200'
    },
    {
      icon: '🏪',
      title: 'Pequeños Negocios',
      description: 'Soluciones accesibles',
      price: 'Desde $800'
    },
    {
      icon: '💻',
      title: 'Aplicaciones Web',
      description: 'Desarrollo personalizado',
      price: 'Desde $4,500'
    }
  ];

  durations = [
    { period: '1 semana', price: '$150' },
    { period: '1 mes', price: '$400' },
    { period: '3 meses', price: '$1,000' }
  ];

  testimonials = [
    {
      name: 'María González',
      company: 'Boutique Elena',
      text: 'Transformaron completamente mi negocio online'
    },
    {
      name: 'Carlos Mendoza',
      company: 'Consultora Mendoza',
      text: 'Profesionales excepcionales'
    },
    {
      name: 'Ana Ruiz',
      company: 'Café Central',
      text: 'El servicio fue perfecto'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getHelloWorld().subscribe({
      next: (response) => {
        console.log(response.data.message);
      },
      error: (error) => {
        console.error('Error requesting API', error);
      }
    });
  }
}
