import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproj',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './newproj.component.html',
  styleUrls: ['./newproj.component.scss']
})
export class NewprojComponent implements OnInit{
  title: string = '';
  description: string = '';
  medium: string = '';
  size: string = '';
  picture?: File;
  pictureurl: string = "https://ayyjntjqttcwfulpvggm.supabase.co/storage/v1/object/public/artworks/";
  success: boolean = false;
  userData: any; // Define a variable to store user data
  ngOnInit() {
    this.fetchUserData(); // Call fetchUserData() when the component initializes
  }

  
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
  async insertProj(title: string, description: string, medium: string, size: string, pictureurl: string) {
    const supabase = this.supabaseService.getSupabaseClient();

    // Insert the project data into the 'projects' table
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title: title, desc: description, medium: medium, size: size, imageurl: pictureurl }]);

    if (error) {
      console.error('Error inserting data:', error);
      return null;
    }
    this.success = true
    return data;

  }

  async uploadPicture() {
    if (!this.picture) {
      throw new Error('No picture file selected');
    }

    const supabase = this.supabaseService.getSupabaseClient();
    const { data, error } = await supabase
      .storage
      .from('artworks')
      .upload(`${this.picture.name}`, this.picture, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading picture:', error);
      return null;
    }

    const { publicUrl } = supabase.storage.from('artworks').getPublicUrl(data.path).data;
    this.pictureurl = publicUrl;
    return publicUrl;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureurl = e.target.result; // Set pictureurl to the data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
      this.picture = file; // Store the file for later use (e.g., for uploading)
    }
  }

  async onSubmit() {
    if (this.title.length > 0 && this.description.length > 0 && this.medium.length > 0 && this.size.length > 0) {
      try {
        const pictureurl = await this.uploadPicture();
        if (pictureurl) {
          const result = await this.insertProj(this.title, this.description, this.medium, this.size, pictureurl);
          if (this.success) {
            console.log('Project inserted successfully:', this.success);
            this.router.navigate(['/admin']);
          } else {
            console.error('Failed to insert project');
          }
        }
      } catch (error) {
      }
    }
  }
  
}
