import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button.component';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WebDeveloper Pro
            </h1>
          </div>

          <nav class="hidden md:flex space-x-8">
            <button (click)="scrollToSection('inicio')" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Inicio
            </button>
            <button (click)="scrollToSection('servicios')" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Servicios
            </button>
            <button (click)="scrollToSection('alquiler')" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Alquiler de Enlaces
            </button>
            <button (click)="scrollToSection('testimonios')" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Testimonios
            </button>
          </nav>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <app-button variant="outline" className="gap-2" (click)="toggleDropdown()">
                Contáctanos
                <span class="ml-2">▼</span>
              </app-button>

              <div *ngIf="dropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                <div class="p-4 border-b">
                  <div class="flex items-center space-x-3">
                    <div class="text-green-600">📱</div>
                    <div>
                      <p class="font-medium">WhatsApp</p>
                      <p class="text-sm text-gray-500">{{contact.whatsapp}}</p>
                    </div>
                  </div>
                </div>
                <div class="p-4 border-b">
                  <div class="flex items-center space-x-3">
                    <div class="text-blue-600">📘</div>
                    <div>
                      <p class="font-medium">Facebook</p>
                      <p class="text-sm text-gray-500">@webdeveloper</p>
                    </div>
                  </div>
                </div>
                <div class="p-4 border-b">
                  <div class="flex items-center space-x-3">
                    <div class="text-pink-600">📷</div>
                    <div>
                      <p class="font-medium">Instagram</p>
                      <p class="text-sm text-gray-500">@webdeveloper</p>
                    </div>
                  </div>
                </div>
                <div class="p-4 border-b">
                  <div class="flex items-center space-x-3">
                    <div class="text-red-600">✉️</div>
                    <div>
                      <p class="font-medium">Email</p>
                      <p class="text-sm text-gray-500">{{contact.email}}</p>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex items-center space-x-3">
                    <div class="text-gray-600">📍</div>
                    <div>
                      <p class="font-medium">Ubicación</p>
                      <p class="text-sm text-gray-500">{{contact.address}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button (click)="toggleMenu()" class="md:hidden p-2">
              <div class="w-6 h-6 relative">
                <span [class]="'absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ' + (isMenuOpen ? 'rotate-45 top-3' : 'top-1')"></span>
                <span [class]="'absolute h-0.5 w-6 bg-gray-600 top-3 transition-all duration-300 ' + (isMenuOpen ? 'opacity-0' : 'opacity-100')"></span>
                <span [class]="'absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ' + (isMenuOpen ? '-rotate-45 top-3' : 'top-5')"></span>
              </div>
            </button>
          </div>
        </div>

        <div *ngIf="isMenuOpen" class="md:hidden border-t border-gray-100 py-4">
          <nav class="flex flex-col space-y-4">
            <button (click)="scrollToSectionAndClose('inicio')" class="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Inicio
            </button>
            <button (click)="scrollToSectionAndClose('servicios')" class="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Servicios
            </button>
            <button (click)="scrollToSectionAndClose('alquiler')" class="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Alquiler de Enlaces
            </button>
            <button (click)="scrollToSectionAndClose('testimonios')" class="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Testimonios
            </button>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMenuOpen = false;
  dropdownOpen = false;
  contact: any;

  constructor(private mockDataService: MockDataService) {
    this.contact = this.mockDataService.getContactData();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSectionAndClose(id: string): void {
    this.scrollToSection(id);
    this.isMenuOpen = false;
  }
}
