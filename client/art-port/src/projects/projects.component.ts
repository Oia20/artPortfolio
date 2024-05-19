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
  handleClick(imageUrl: string): void {
    window.open(imageUrl, '_blank');
}
  artistProjects = [
    {
      title: 'Project 1',
      description: 'Description for project 1',
      image: './assets/DarDock.jpg',
      medium: 'Watercolor',
      size: '12x16'
    },
    {
      title: 'Project 2',
      description: 'Description for project 2',
      image: './assets/ParkTree.jpg',
      medium: 'Watercolor',
      size: '12x16'
    },
    {
      title: 'Project 2',
      description: 'Description for project 2',
      image: './assets/ParkTree2.jpg',
      medium: 'Watercolor',
      size: '12x16'
    },
    // Add more projects here...
  ];

  constructor() { }

  ngOnInit(): void {
  }

}