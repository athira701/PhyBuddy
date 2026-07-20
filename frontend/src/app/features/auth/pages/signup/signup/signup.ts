import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayout } from '../../../layouts/auth-layout/auth-layout';
import { SignupForm } from '../../../components/signup-form/signup-form';

type AccountType = 'student' | 'tutor';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,AuthLayout,SignupForm],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  accountType = signal<AccountType>('student');

  selectAccountType(type: AccountType): void {
    this.accountType.set(type);
  }

  onCreateAccount(): void {
   
    console.log('Create account clicked', {
      fullName: this.fullName(),
      email: this.email(),
      accountType: this.accountType()
    });
  }

  onGoogleSignIn(): void {
    console.log('Continue with Google clicked');
  }
}
