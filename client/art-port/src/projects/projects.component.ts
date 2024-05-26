import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  artistProjects: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    const apiUrl = 'http://localhost:5103/Projects'; // Replace with your API URL
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.artistProjects = data;
      })
      .catch(error => {
        console.error('Error fetching projects', error);
      });
  }

  handleClick(imageUrl: string): void {
    window.open(imageUrl, '_blank');
  }
}