import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-select',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './project-select.component.html',
  styleUrl: './project-select.component.scss'
})
export class ProjectSelectComponent {
  artistProjects: any[] = [];
  isLoading = true;
  fetchFailed = false;
  skeletonArray = Array(6); // Array with 4 elements for skeleton loaders

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    const apiUrl = 'https://ravishing-commitment-production.up.railway.app/api/Projects'; // Replace with your API URL
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.artistProjects = data;
        this.isLoading = false;
        this.fetchFailed = false;
      })
      .catch(error => {
        console.error('Error fetching projects', error);
        setTimeout(() => this.fetchProjects(), 2000);
        // this.fetchFailed = true;
        // Keep isLoading true to persist the skeletons
      });
  }

  viewProject(projectId: string): void {
    this.router.navigate(['/edit', projectId]);
  }
}