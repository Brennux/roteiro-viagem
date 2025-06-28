import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-formulario-teste',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-teste.html',
  styleUrl: './formulario-teste.css',
  animations: [
    // Animação de zoom para o formulário
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    // Animação de shake para erros
    trigger('shake', [
      state('error', style({ transform: 'translateX(0)' })),
      transition('* => error', [
        animate('400ms ease-in-out', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.2 }),
          style({ transform: 'translateX(-10px)', offset: 0.3 }),
          style({ transform: 'translateX(10px)', offset: 0.4 }),
          style({ transform: 'translateX(-10px)', offset: 0.5 }),
          style({ transform: 'translateX(10px)', offset: 0.6 }),
          style({ transform: 'translateX(-10px)', offset: 0.7 }),
          style({ transform: 'translateX(10px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),
    // Animação de checkmark para sucesso
    trigger('checkmark', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    // Animação de fade para mensagens
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class FormularioTeste {
  cadastroForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;
  fieldErrors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      aceitarTermos: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador customizado para confirmação de senha
  passwordMatchValidator(form: FormGroup) {
    const senha = form.get('senha');
    const confirmarSenha = form.get('confirmarSenha');

    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmarSenha?.errors && confirmarSenha.errors['passwordMismatch']) {
      delete confirmarSenha.errors['passwordMismatch'];
      if (Object.keys(confirmarSenha.errors).length === 0) {
        confirmarSenha.setErrors(null);
      }
    }

    return null;
  }

  // Máscara para telefone
  formatarTelefone(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      }
    }

    this.cadastroForm.patchValue({ telefone: value });
  }

  // Verificar se um campo tem erro
  hasError(fieldName: string): boolean {
    const field = this.cadastroForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Obter mensagem de erro para um campo
  getErrorMessage(fieldName: string): string {
    const field = this.cadastroForm.get(fieldName);

    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors['email']) {
        return 'Digite um email válido';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `Mínimo de ${minLength} caracteres`;
      }
      if (field.errors['pattern'] && fieldName === 'telefone') {
        return 'Digite um telefone válido: (11) 99999-9999';
      }
      if (field.errors['passwordMismatch']) {
        return 'As senhas não coincidem';
      }
      if (field.errors['requiredTrue']) {
        return 'Você deve aceitar os termos';
      }
    }

    return '';
  }

  // Trigger da animação de shake
  triggerShake(fieldName: string) {
    this.fieldErrors[fieldName] = 'error';
    setTimeout(() => {
      this.fieldErrors[fieldName] = '';
    }, 400);
  }

  // Submit do formulário
  onSubmit() {
    if (this.cadastroForm.valid) {
      this.isSubmitting = true;

      const formData = this.cadastroForm.value;

      this.userService.registerUser(
        formData.nome,
        formData.email,
        formData.telefone,
        formData.senha
      ).subscribe({
        next: (result) => {
          this.isSubmitting = false;

          if (result.success) {
            this.showSuccess = true;
            this.cadastroForm.reset();

            // Esconder mensagem de sucesso após 3 segundos e redirecionar para login
            setTimeout(() => {
              this.showSuccess = false;
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            // Mostrar erro específico (ex: email já cadastrado)
            this.triggerShake('email');
            this.fieldErrors['email'] = result.message;
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erro no cadastro:', error);
          // Pode adicionar tratamento de erro genérico aqui
        }
      });
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.cadastroForm.controls).forEach(field => {
        const control = this.cadastroForm.get(field);
        control?.markAsTouched();

        // Trigger shake animation para campos com erro
        if (control?.invalid) {
          this.triggerShake(field);
        }
      });
    }
  }

  // Reset do formulário
  resetForm() {
    this.cadastroForm.reset();
    this.showSuccess = false;
    this.fieldErrors = {};
  }

  // Navegar para o login
  onNavigateToLogin() {
    this.router.navigate(['/login']);
  }
}
