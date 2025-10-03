import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <section id="inicio" class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-bounce">
            ✨ ¡Nuevos servicios de alquiler temporal!
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Desarrollamos
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Tu Presencia Digital
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Creamos sitios web profesionales, tiendas online y aplicaciones que
            <span class="font-semibold text-blue-600"> impulsan tu negocio</span> al siguiente nivel
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <app-button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              (click)="scrollToSection('servicios')"
            >
              Ver Servicios →
            </app-button>
            <app-button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              (click)="scrollToSection('alquiler')"
            >
              Alquiler Temporal
            </app-button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="flex items-center justify-center space-x-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  ⚡
                </div>
              </div>
              <div class="text-left">
                <h3 class="font-semibold text-gray-900">Desarrollo Rápido</h3>
                <p class="text-gray-600 text-sm">Entrega en tiempo récord</p>
              </div>
            </div>

            <div class="flex items-center justify-center space-x-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  🛡️
                </div>
              </div>
              <div class="text-left">
                <h3 class="font-semibold text-gray-900">100% Seguro</h3>
                <p class="text-gray-600 text-sm">Tecnología de punta</p>
              </div>
            </div>

            <div class="flex items-center justify-center space-x-3 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  ✨
                </div>
              </div>
              <div class="text-left">
                <h3 class="font-semibold text-gray-900">Diseño Premium</h3>
                <p class="text-gray-600 text-sm">Calidad profesional</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
