import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    createdAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly STORAGE_KEY = 'registered_users';
    private usersSubject = new BehaviorSubject<User[]>(this.getStoredUsers());

    constructor() { }

    // Obter usuários do localStorage
    private getStoredUsers(): User[] {
        try {
            const users = localStorage.getItem(this.STORAGE_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Erro ao carregar usuários do localStorage:', error);
            return [];
        }
    }

    // Salvar usuários no localStorage
    private saveUsers(users: User[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
            this.usersSubject.next(users);
        } catch (error) {
            console.error('Erro ao salvar usuários no localStorage:', error);
        }
    }

    // Registrar novo usuário
    registerUser(nome: string, email: string, telefone: string, senha: string): Observable<{ success: boolean; message: string; user?: User }> {
        return new Observable(observer => {
            const users = this.getStoredUsers();

            // Verificar se o email já existe
            const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                observer.next({ success: false, message: 'Este email já está cadastrado!' });
                observer.complete();
                return;
            }

            // Criar novo usuário
            const newUser: User = {
                id: this.generateId(),
                nome,
                email: email.toLowerCase(),
                telefone,
                senha, // Em um app real, a senha deveria ser criptografada
                createdAt: new Date()
            };

            // Adicionar à lista e salvar
            users.push(newUser);
            this.saveUsers(users);

            observer.next({
                success: true,
                message: 'Usuário cadastrado com sucesso!',
                user: { ...newUser, senha: '' } // Não retornar a senha
            });
            observer.complete();
        });
    }

    // Fazer login
    login(email: string, senha: string): Observable<{ success: boolean; message: string; user?: User }> {
        return new Observable(observer => {
            const users = this.getStoredUsers();

            // Buscar usuário pelo email
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                observer.next({ success: false, message: 'Email não encontrado. Você precisa se cadastrar primeiro!' });
                observer.complete();
                return;
            }

            // Verificar senha
            if (user.senha !== senha) {
                observer.next({ success: false, message: 'Senha incorreta!' });
                observer.complete();
                return;
            }

            // Login bem-sucedido
            observer.next({
                success: true,
                message: 'Login realizado com sucesso!',
                user: { ...user, senha: '' } // Não retornar a senha
            });
            observer.complete();
        });
    }

    // Obter todos os usuários (para debug - remover em produção)
    getUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    // Verificar se email existe
    emailExists(email: string): boolean {
        const users = this.getStoredUsers();
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Gerar ID único
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Limpar todos os usuários (para debug)
    clearAllUsers(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.usersSubject.next([]);
    }
}
