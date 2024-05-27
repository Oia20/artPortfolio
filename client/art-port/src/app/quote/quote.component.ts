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
  // Declaration of two TS string class properties to store quote from api.
  quote: string = '';
  author: string = '';

  // Constructor for Angulars httpclient.
  constructor(private http: HttpClient) {
    this.api(); // Call the API method to fetch the quote on component initialization
  }

  api() {
    // Angular's http get syntax '{quote: string, author: string}' is the expected structure of the request
    this.http.get<{ quote: string, author: string }[]>('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
      // header with included api key.
      headers: {
        'X-Api-Key': 'I0FGSHrs0O3REcvgvuH4zQ==OYaU3cLbb1Jzz7pn',
      }
      // Each method returns an RxJS Observable which, when subscribed, sends the request and then emits the results when the server responds.
      // may be subscribed any number of times and will make a new backend request for each subscription.
    }).subscribe({
      // This particular subscribe has an object with 3 steps.

      // next which in this fetch handles the expected response.
      next: response => {
        if (response && response.length > 0) {
          this.quote = response[0].quote;
          this.author = response[0].author;
        }
      },

      // error which handles the error, if there is one.
      error: error => {
        console.error('Error fetching quote:', error);
      },

      // lastly complete for exiting the fetch.
      complete: () => {
      }
    });
  }
}
