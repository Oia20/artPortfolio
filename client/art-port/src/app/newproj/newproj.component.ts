import { Component } from '@angular/core';
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
export class NewprojComponent {
  title: string = '';
  description: string = '';
  medium: string = '';
  size: string = '';
  picture?: File;
  pictureurl: string = "https://ayyjntjqttcwfulpvggm.supabase.co/storage/v1/object/public/artworks/";
  success: boolean = false;

  constructor(private supabaseService: SupabaseService, private router: Router) {}

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
    this.picture = event.target.files[0];
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
