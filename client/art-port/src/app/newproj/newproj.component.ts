import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newproj',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newproj.component.html',
  styleUrls: ['./newproj.component.scss']
})
export class NewprojComponent {
  title: string = '';
  description: string = '';
  medium: string = '';
  size: string = '';
  picture?: File;

  onFileChange(event: any) {
    this.picture = event.target.files[0];
  }

  onSubmit() {
    console.log('Form Submitted:', this);
  }
}
