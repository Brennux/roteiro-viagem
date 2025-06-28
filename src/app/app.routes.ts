import { Routes } from '@angular/router';
import { LoginTeste } from './components/login-teste/login-teste';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginTeste },
    {
        path: 'cadastro',
        loadComponent: () => import('./components/formulario-teste/formulario-teste').then(m => m.FormularioTeste)
    },
    { path: '**', redirectTo: '/login' }
];
