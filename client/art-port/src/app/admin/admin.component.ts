import { Component } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [QuoteComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {

}