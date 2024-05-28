import { Component, OnInit } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [QuoteComponent, RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  userData: any; // Define a variable to store user data
  constructor(private supabaseService: SupabaseService, private router: Router) {}



  ngOnInit() {
    this.fetchUserData(); // Call fetchUserData() when the component initializes
  }

  async fetchUserData() {
    try {
      const supabase = this.supabaseService.getSupabaseClient();

      const { data: { user } } = await supabase.auth.getUser();
      this.userData = user; // Assign user data to userData variable
      console.log(this.userData.aud)
      if (this.userData.aud) {
        return
      } else {
        this.router.navigate(['/login']);

      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.router.navigate(['/login']);
    }
  }
}
