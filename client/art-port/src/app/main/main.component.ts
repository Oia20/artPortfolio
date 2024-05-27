
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AdminComponent } from '../admin/admin.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProjectsComponent, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  professions: string[] = ["An Artist", "A Painter", "A Creator", "A Learner", "A Nature Lover", "A Glass Artist", "A Designer"];
  selectedProfession: string = this.professions[0]; // Default to the first profession
  typingProfession: string = ""; // Variable to hold the currently typing profession
  typingIndex: number = 0; // Index to track the current character being typed
  professionIndex: number = 0; // Index to track the current profession being displayed
  deleting: boolean = false;

  ngOnInit() {
    this.startTypingLoop();
  }

  startTypingLoop() {
    setInterval(() => {
      if (!this.deleting) {
        const profession = this.professions[this.professionIndex];
        if (this.typingIndex < profession.length) {
          this.typingProfession = profession.slice(0, this.typingIndex + 1);
          this.typingIndex++;
        } else {
          this.deleting = true;
          setTimeout(() => {
            this.startBackspacingLoop();
          }, 1000);
        }
      }
    }, 250);
  }

  startBackspacingLoop() {
    let backspaceInterval = setInterval(() => {
      if (this.typingIndex > 0) {
        this.typingProfession = this.typingProfession.slice(0, this.typingIndex - 1);
        this.typingIndex--;
      } else {
        clearInterval(backspaceInterval);
        // Move to the next profession
        this.professionIndex = (this.professionIndex + 1) % this.professions.length;
        this.typingIndex = 0;
        this.deleting = false;
      }
    }, 150);
  }
}
