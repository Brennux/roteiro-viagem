import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../../service/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Obter informações do usuário atual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Método para fazer logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Obter iniciais do nome do usuário
  getUserInitials(): string {
    if (!this.currentUser?.nome) return 'U';

    const names = this.currentUser.nome.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  }
}
