import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [QuoteComponent, RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {

}