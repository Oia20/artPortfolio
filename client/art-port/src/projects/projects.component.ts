import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  artistProjects = [
    {
      title: 'Project 1',
      description: 'Description for project 1',
      image: './assets/DarDock.jpg',
      medium: 'Watercolor'
    },
    {
      title: 'Project 2',
      description: 'Description for project 2',
      image: './assets/ParkTree.jpg',
      medium: 'Watercolor'
    },
    {
      title: 'Project 2',
      description: 'Description for project 2',
      image: './assets/ParkTree2.jpg',
      medium: 'Watercolor'
    },
    // Add more projects here...
  ];

  constructor() { }

  ngOnInit(): void {
  }

}