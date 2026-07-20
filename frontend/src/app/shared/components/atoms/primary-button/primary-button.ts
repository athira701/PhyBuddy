import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css',
})
export class PrimaryButton {
  type = input<'button' | 'submit'>('button');
  disabled = input(false)
  loading = input(false)
}
