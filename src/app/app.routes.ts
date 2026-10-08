import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./landing/landing').then(m => m.Landing)
    },
    {
        path: 'strzelnica',
        loadComponent: () => import('./about/about').then(m => m.About)
    }
];
