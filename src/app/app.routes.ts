import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'varma', pathMatch: 'full'
    },
    {
        path: 'varma', loadComponent: () => import('./special-page/special-page').then(m => m.SpecialPage)
    }
];
