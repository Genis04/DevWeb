import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AdminComponent } from './pages/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
