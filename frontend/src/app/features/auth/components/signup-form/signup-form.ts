import { Component, inject, signal } from '@angular/core';
import { BookOpen, CircleCheck, GraduationCap, LucideAngularModule } from 'lucide-angular';
import { PrimaryButton } from '../../../../shared/components/atoms/primary-button/primary-button';
import { Divider } from '../../../../shared/components/atoms/divider/divider';
import { GoogleButton } from '../../../../shared/components/molecules/google-button/google-button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private fb = inject(FormBuilder);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    role: ['student'],
  });

  selectedRole = signal<'student' | 'tutor'>('student')
  selectRole(role:'student'| 'tutor'){
    this.selectedRole.set(role)
    this.signupForm.patchValue({role})
  }
  onSubmit(): void {
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }
  console.log(this.signupForm.getRawValue());
}
}
