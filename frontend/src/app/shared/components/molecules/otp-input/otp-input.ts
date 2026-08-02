import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-otp-input',
  imports: [],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.css',
})
export class OtpInput {
  private otpValues = ['', '', '', ''];
  // readonly value = input('');

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Output()
  readonly otpChange = new EventEmitter<string>();

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const digit = value.replace(/\D/g, '');
    input.value = digit;
    this.otpValues[index] = digit;
    this.otpChange.emit(this.otpValues.join(''));

    if (digit && index < this.otpValues.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  reset(): void {
    this.otpValues = ['', '', '', ''];

    this.otpInputs.forEach((input) => {
      input.nativeElement.value = '';
    });

    this.otpChange.emit('');

    this.otpInputs.first?.nativeElement.focus();
  }
}
