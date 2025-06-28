import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly CURRENT_USER_KEY = 'current_user';
    private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    // Obter usuário atual do localStorage
    private getCurrentUser(): User | null {
        try {
            const user = localStorage.getItem(this.CURRENT_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Erro ao carregar usuário atual:', error);
            return null;
        }
    }

    // Definir usuário atual
    setCurrentUser(user: User): void {
        try {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
            this.currentUserSubject.next(user);
        } catch (error) {
            console.error('Erro ao salvar usuário atual:', error);
        }
    }

    // Verificar se está logado
    isLoggedIn(): boolean {
        return this.getCurrentUser() !== null;
    }

    // Obter usuário atual
    getCurrentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    // Fazer logout
    logout(): void {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        this.currentUserSubject.next(null);
    }
}