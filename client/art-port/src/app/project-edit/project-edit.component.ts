import { Component } from '@angular/core';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  projectId: string = "";
  artistProjects: any[] = [];
  fetchFailed = false;
  
  constructor() { }

  ngOnInit(): void {
    this.fetchProject();
  }
  fetchProject(): void {
    const PROJECT_URL = 'http://localhost:5103/api/Projects' + '/' + this.projectId;
    fetch(PROJECT_URL)
      .then(response => response.json())
      .then(data => {
        this.artistProjects = data;
        this.fetchFailed = false;
      })
      .catch(error => {
        console.error('Error fetching projects', error);
        setTimeout(() => this.fetchProject(), 2000);
        // this.fetchFailed = true;
        // Keep isLoading true to persist the skeletons
      });
  }
  
}
