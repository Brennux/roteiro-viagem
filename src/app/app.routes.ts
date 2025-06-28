import { Routes } from '@angular/router';
import { LoginTeste } from './components/login-teste/login-teste';
import { Home } from './components/home/home';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginTeste },
    { path: 'home', component: Home, canActivate: [AuthGuard] },
    {
        path: 'cadastro',
        loadComponent: () => import('./components/formulario-teste/formulario-teste').then(m => m.FormularioTeste)
    },
    { path: '**', redirectTo: '/login' }
];
