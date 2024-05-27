import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {
  timeTogether: string = '';
  timeUntilAnniversary: string = '';
  distanceTraveled: string = '';
  private timerSubscription!: Subscription;

  ngOnInit() {
    this.updateCounters();
    this.timerSubscription = interval(1000).subscribe(() => this.updateCounters());
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private updateCounters() {
    const startDate = new Date(2021, 6, 1); // July 2021 (month is 0-indexed)
    const now = new Date();

    this.timeTogether = this.getTimeDifference(startDate, now);
    this.distanceTraveled = this.getDistanceTraveled(startDate, now);

    const nextAnniversary = new Date(now.getFullYear(), 6, 20); // July 20th of the current year
    if (now > nextAnniversary) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }

    this.timeUntilAnniversary = this.getTimeDifference(now, nextAnniversary);
  }

  private getTimeDifference(startDate: Date, endDate: Date): string {
    const totalSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${this.padZero(hours)}h ${this.padZero(minutes)}m ${this.padZero(seconds)}s`;
  }

  private getDistanceTraveled(startDate: Date, endDate: Date): string {
    const totalSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    const earthSpeedKmPerSec = 30; // Earth's orbital speed in km/s
    const distanceKm = totalSeconds * earthSpeedKmPerSec;
    const distanceMiles = distanceKm * 0.621371; // Convert km to miles
    return `${distanceMiles.toFixed(2)} miles`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}