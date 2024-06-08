import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgForOf],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  projectId: string | null = null;
  project: any[string] = [];
  fetchFailed = false;
  picture?: File;
  pictureurl: string = "";

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

  // Change the project data
  async onSubmit():  Promise<void> {
    const pictureurl = await this.uploadPicture();
    if (pictureurl) {
      const PROJECT_URL = 'http://localhost:5103/Projects/Update' + '/' + this.projectId;
      fetch(PROJECT_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: this.project.title, desc: this.project.desc, medium: this.project.medium, size: this.project.size, imageurl: pictureurl }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.fetchFailed = false;
        })
        .catch(error => {
          console.error('Error fetching projects', error);
          console.log(this.project)
          // setTimeout(() => this.fetchProject(), 2000);
        });
    }
  }
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.fetchProject();
  }
  fetchProject(): void {
    const PROJECT_URL = 'http://localhost:5103/Projects' + '/' + this.projectId;
    fetch(PROJECT_URL)
      .then(response => response.json())
      .then(data => {
        this.project = data;
        this.fetchFailed = false;
      })
      .catch(error => {
        console.error('Error fetching projects', error);
        console.log(this.project)
        // setTimeout(() => this.fetchProject(), 2000);
      });
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
        upsert: true
      });

    if (error) {
      console.error('Error uploading picture:', error);
      return null;
    }

    const { publicUrl } = supabase.storage.from('artworks').getPublicUrl(data.path).data;
    this.pictureurl = publicUrl;
    return publicUrl;
  }
}
