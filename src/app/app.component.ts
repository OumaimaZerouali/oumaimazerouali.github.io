import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/virtual-desktop/footer/footer.component';
import {WindowContentType} from './services/window-management.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  openWindows: any[] = [];
  nextWindowId = 0;
  draggingWindow: any | null = null;
  offsetX = 0;
  offsetY = 0;

  openWindow(type: WindowContentType, title: string): void {
    this.openWindows.forEach(win => win.active = false);

    const existingWindow = this.openWindows.find(win => win.content === type);

    if (existingWindow) {
      existingWindow.active = true;
    } else {
      const initialWidth = 600;
      const initialHeight = 450;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const centerX = (screenWidth / 2) - (initialWidth / 2);
      const centerY = (screenHeight / 2) - (initialHeight / 2);

      const newWindow = {
        id: `window-${this.nextWindowId++}`,
        title,
        active: true,
        content: type,
        x: centerX + (this.nextWindowId * 10 % 50),
        y: centerY + (this.nextWindowId * 10 % 50),
        width: initialWidth,
        height: initialHeight
      };

      this.openWindows.push(newWindow);
    }
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingWindow) {
      const minX = 0;
      const minY = 0;
      const maxX = window.innerWidth - this.draggingWindow.width;
      const maxY = window.innerHeight - this.draggingWindow.height;

      this.draggingWindow.x = Math.max(minX, Math.min(maxX, event.clientX - this.offsetX));
      this.draggingWindow.y = Math.max(minY, Math.min(maxY, event.clientY - this.offsetY));
    }
  }

  @HostListener('document:mouseup')
  stopDrag(): void {
    this.draggingWindow = null;
  }
}
