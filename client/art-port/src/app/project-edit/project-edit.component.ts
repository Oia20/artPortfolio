import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgForOf],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit{
  projectId: string | null = null;
  project: any = {};
  fetchFailed = false;
  picture?: File;
  pictureurl: string = "";
  userData: any; // Define a variable to store user data
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
  async onSubmit(): Promise<void> {
    const pictureurl = await this.uploadPicture();
    const PROJECT_URL = 'http://localhost:5103/Projects/Update' + '/' + this.projectId;
    fetch(PROJECT_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.project.title,
        desc: this.project.desc,
        medium: this.project.medium,
        size: this.project.size,
        imageurl: pictureurl
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.fetchFailed = false;
      this.router.navigate(['/admin']);

    })
    .catch(error => {
      console.error('Error updating project', error);
      this.fetchFailed = true;
    });
  }

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.fetchProject();
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
  fetchProject(): void {
    const PROJECT_URL = 'http://localhost:5103/Projects' + '/' + this.projectId;
    fetch(PROJECT_URL)
      .then(response => response.json())
      .then(data => {
        this.project = data;
        this.fetchFailed = false;
      })
      .catch(error => {
        console.error('Error fetching project', error);
        this.fetchFailed = true;
      });
  }

  async uploadPicture() {
    // if there is no new picture, reupload the old one
    if (!this.picture) {
      return this.project.imageurl;
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

  deleteProject(): void {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const PROJECT_URL = 'http://localhost:5103/Projects/Delete' + '/' + this.projectId;
      fetch(PROJECT_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          // Successful deletion
          return response.text(); // Return text instead of JSON
        } else {
          throw new Error('Failed to delete project');
        }
      })
      .then(data => {
        console.log('Project deleted:', data);
        this.fetchFailed = false;
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.error('Error deleting project', error);
        this.fetchFailed = true;
      });
    }
  }
}
