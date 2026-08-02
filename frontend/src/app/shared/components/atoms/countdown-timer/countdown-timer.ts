import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  imports: [],
  templateUrl: './countdown-timer.html',
  styleUrl: './countdown-timer.css',
})
export class CountdownTimer {
    readonly remainingSeconds = input.required<number>();

  readonly formattedTime = computed(() => {

    const totalSeconds = this.remainingSeconds();

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  });

}
