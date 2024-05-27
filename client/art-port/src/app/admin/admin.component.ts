import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {
  quote: string = '';
  author: string = '';
  constructor(private http: HttpClient) {
    this.api(); // Call the API method to fetch the quote on component initialization
  }

  api() {
    this.http.get<{quote: string, author: string}[]>('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
      headers: {
        'X-Api-Key': 'I0FGSHrs0O3REcvgvuH4zQ==OYaU3cLbb1Jzz7pn',
      }
    }).subscribe(response => {
      if (response && response.length > 0) {
        this.quote = response[0].quote; // Assuming the API returns an array of quotes
        this.author = response[0].author;
        console.log(response)
      }
    }, error => {
      console.error('Error fetching quote:', error);
    });
  }
}