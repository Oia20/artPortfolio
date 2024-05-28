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

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async login() {
    try {
      // Attempt to sign in with Supabase
      await this.supabaseService.signIn(this.email, this.password);
      // If successful, navigate to admin page
      this.router.navigate(['/admin']);
    } catch (error) {
      // If login fails, display error message
      console.error('Login error:', error);
      this.error = 'Invalid email or password. Please try again.';
    }
  }
}
