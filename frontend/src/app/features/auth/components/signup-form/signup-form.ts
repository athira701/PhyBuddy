import { Component, inject, signal } from '@angular/core';
import { BookOpen, CircleCheck, GraduationCap, LucideAngularModule } from 'lucide-angular';
import { PrimaryButton } from '../../../../shared/components/atoms/primary-button/primary-button';
import { Divider } from '../../../../shared/components/atoms/divider/divider';
import { GoogleButton } from '../../../../shared/components/molecules/google-button/google-button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../models/signup-request.model';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, LucideAngularModule, PrimaryButton, Divider, GoogleButton],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  readonly GraduationCap = GraduationCap;
  readonly BookOpen = BookOpen;
  readonly CircleCheck = CircleCheck;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  signupForm = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: this.fb.nonNullable.control<'student'|'tutor'>('student'),
    },
    { validators: passwordMatchValidator() },
  );

  get name() {
    return this.signupForm.controls.name;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get confirmPassword() {
    return this.signupForm.controls.confirmPassword;
  }

  selectedRole = signal<'student' | 'tutor'>('student');
  isLoading = signal(false);
  errorMessage = signal('');

  selectRole(role: 'student' | 'tutor') {
    this.selectedRole.set(role);
    this.signupForm.patchValue({ role });
  }
  onSubmit(): void {
this.errorMessage.set('')

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const { confirmPassword, ...request } = this.signupForm.getRawValue();

    this.isLoading.set(true)

    this.authService.signup(request).pipe(finalize(()=>this.isLoading.set(false))).subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error:(error)=>{
        this.errorMessage.set(error.error.message)
      }
    })
  }
}
