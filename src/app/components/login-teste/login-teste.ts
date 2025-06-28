import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-teste',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-teste.html',
  styleUrl: './login-teste.css'
})
export class LoginTeste {
  loginForm!: FormGroup;
  isLoading = false;
  loginError = '';
  loginSuccess = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    // Redirecionar para home se já estiver logado
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Log dos usuários cadastrados no console para debug
    this.userService.getUsers().subscribe(users => {
      console.log('=== USUÁRIOS CADASTRADOS ===');
      if (users.length === 0) {
        console.log('Nenhum usuário cadastrado ainda.');
      } else {
        users.forEach((user, index) => {
          console.log(`${index + 1}. ${user.nome} (${user.email}) - Cadastrado em: ${new Date(user.createdAt).toLocaleString()}`);
        });
      }
      console.log('============================');
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    // Limpar mensagens anteriores
    this.loginError = '';
    this.loginSuccess = '';

    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (result) => {
          this.isLoading = false;

          if (result.success) {
            this.loginSuccess = result.message;
            console.log('Login bem-sucedido:', result.user);

            // Definir usuário atual no AuthService
            if (result.user) {
              this.authService.setCurrentUser(result.user);
            }

            // Redirecionar para a página home
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          } else {
            this.loginError = result.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = 'Erro interno. Tente novamente.';
          console.error('Erro no login:', error);
        }
      });
    } else {
      // Marca todos os campos como tocados para mostrar os erros
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onForgotPassword() {
    console.log('Esqueceu a senha clicado');
  }

  onNavigateToSignup() {
    this.router.navigate(['/cadastro']);
  }
}
