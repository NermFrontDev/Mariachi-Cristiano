import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mariachi-website';

  activeSection: string = '';

  onSectionVisible(sectionId: string, isVisible: boolean): void {
    if (isVisible) {
      this.activeSection = sectionId;
    }
  }
}
