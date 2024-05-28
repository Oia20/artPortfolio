import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = ''; // Variable to store login error message
  userData: any; // Define a variable to store user data

  constructor(private supabaseService: SupabaseService, private router: Router) {}
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

  async login() {
    try {
      // Attempt to sign in with Supabase
      await this.supabaseService.signIn(this.email, this.password);
      await this.fetchUserData();

      if (this.userData.aud) {
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Invalid email or password. Please try again.';
      }
      // If successful, navigate to admin page
    } catch (error) {
      // If login fails, display error message
      console.error('Login error:', error);
      this.error = 'Invalid email or password. Please try again.';

    }
  }
}
