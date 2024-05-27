import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Quote is using the api ninja quote api, limit is 10k requests per month, we shouldn't make a dent in that.

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {
  quote: string = '';
  author: string = '';
  constructor(private http: HttpClient) {
    this.api(); // Call the API method to fetch the quote on component initialization
  }

  api() {
    this.http.get<{quote: string, author: string}[]>('https://api.api-ninjas.com/v1/quotes?category=art', {
      headers: {
        'X-Api-Key': 'I0FGSHrs0O3REcvgvuH4zQ==OYaU3cLbb1Jzz7pn',
      }
    }).subscribe(response => {
      if (response && response.length > 0) {
        this.quote = response[0].quote; // Assuming the API returns an array of quotes
        this.author = response[0].author;
      }
    }, error => {
      console.error('Error fetching quote:', error);
    });
  }
}
