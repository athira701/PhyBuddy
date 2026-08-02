import { Component, computed, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowLeft, LucideAngularModule, Mail } from 'lucide-angular';
import { CountdownTimer } from '../../../../shared/components/atoms/countdown-timer/countdown-timer';
import { Brand } from '../../../../shared/components/atoms/brand/brand';
import { PrimaryButton } from '../../../../shared/components/atoms/primary-button/primary-button';
import { OtpInput } from '../../../../shared/components/molecules/otp-input/otp-input';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-otp',
  imports: [CountdownTimer, Brand, PrimaryButton, OtpInput, LucideAngularModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp implements OnInit, OnDestroy {
  readonly ArrowLeft = ArrowLeft;
  readonly Mail = Mail;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private timerId?: ReturnType<typeof setInterval>;

  @ViewChild(OtpInput) private otpInput!: OtpInput;

  email = signal('');

  otp = signal('');

  remainingSeconds = signal(60);

  isLoading = signal(false);

  errorMessage = signal('');

  canResend = computed(() => this.remainingSeconds() === 0);

  ngOnInit(): void {
    const email = sessionStorage.getItem('verificationEmail');

    if (!email) {
      void this.router.navigate(['/signup']);
      return;
    }

    this.email.set(email);
    this.startTimer();
  }
  onOtpChange(otp: string): void {
    this.otp.set(otp);
  }

  verifyOtp(): void {
    this.errorMessage.set('');

    if (this.otp().length !== 4) {
      return;
    }

    this.isLoading.set(true);

    this.authService
      .verifyOtp({
        email: this.email(),
        otp: this.otp(),
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          sessionStorage.removeItem('verificationEmail');
          void this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage.set(error.error.message);
        },
      });
  }

  resendOtp(): void {
    if (!this.canResend()) {
      return;
    }

    this.errorMessage.set('');

    this.isLoading.set(true);

    this.authService
      .resendOtp({
        email: this.email(),
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
         
          this.otp.set('');
          this.otpInput.reset();

          this.remainingSeconds.set(60);
          this.startTimer();
        },

        error: (error) => {
          this.errorMessage.set(error.error.message);
        },
      });
  }

  private startTimer(): void {
    this.stopTimer();

    this.timerId = setInterval(() => {
      if (this.remainingSeconds() > 0) {
        this.remainingSeconds.update((value) => value - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);

      this.timerId = undefined;
    }
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }
}
