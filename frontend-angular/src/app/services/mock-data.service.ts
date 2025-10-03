import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  mockData = {
    contact: {
      whatsapp: '+52 55 1234 5678',
      email: 'contacto@webdeveloper.com',
      address: 'Ciudad de México, MX'
    }
  };

  getContactData() {
    return this.mockData.contact;
  }
}
