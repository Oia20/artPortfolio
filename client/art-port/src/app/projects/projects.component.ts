import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  artistProjects: any[] = [];
  isLoading = true;
  fetchFailed = false;
  skeletonArray = Array(6); // Array with 4 elements for skeleton loaders

  constructor() { }

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

  handleClick(imageUrl: string): void {
    window.open(imageUrl, '_blank');
  }
}
