import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  projectId: string | null = null;
  project: any[] = [];
  fetchFailed = false;
  

  constructor(private route: ActivatedRoute) {}

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
  
}
