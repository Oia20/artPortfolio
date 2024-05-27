import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newproj',
  standalone: true,
  imports: [BrowserModule, CommonModule, FormsModule],
  templateUrl: './newproj.component.html',
  styleUrl: './newproj.component.scss'
})
export class NewprojComponent {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public medium: string,
    public size: string,
    public picture?: File,
  ) {}

}
