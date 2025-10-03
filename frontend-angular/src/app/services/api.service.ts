import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: AxiosInstance;
  private BACKEND_URL = 'http://localhost:8000';

  constructor() {
    this.api = axios.create({
      baseURL: `${this.BACKEND_URL}/api`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getHelloWorld(): Observable<any> {
    return from(this.api.get('/'));
  }

  getRentalRequests(): Observable<any> {
    return from(this.api.get('/rental-requests'));
  }

  getActiveRentals(): Observable<any> {
    return from(this.api.get('/active-rentals'));
  }

  getRentalBySlug(slug: string): Observable<any> {
    return from(this.api.get(`/rental/${slug}`));
  }

  createRentalRequest(data: any): Observable<any> {
    return from(this.api.post('/rental-requests', data));
  }

  approveRentalRequest(requestId: string, approved: boolean): Observable<any> {
    return from(this.api.post(`/rental-requests/${requestId}/approve`, { approved }));
  }
}
