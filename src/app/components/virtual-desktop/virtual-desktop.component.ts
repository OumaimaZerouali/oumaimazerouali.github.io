import {Component} from '@angular/core';
import {TicTacToeComponent} from './mini-games/tic-tac-toe.component';
import {BrowserComponent} from './browser/browser.component';
import {ContactComponent} from './contact/contact.component';
import {AboutmeComponent} from './aboutme/aboutme.component';

type WindowContentType = 'tictactoe' | 'about' | 'contact' | 'ie';

interface WindowTab {
  id: string;
  title: string;
  active: boolean;
  content: WindowContentType;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'virtual-desktop',
  standalone: true,
  templateUrl: './virtual-desktop.component.html',
  styleUrls: ['./virtual-desktop.component.scss'],
  imports: [
    TicTacToeComponent,
    BrowserComponent,
    ContactComponent,
    AboutmeComponent
  ]
})
export class VirtualDesktopComponent {
  openWindows: WindowTab[] = [];
  nextWindowId = 0;
  draggingWindow: WindowTab | null = null;
  offsetX = 0;
  offsetY = 0;

  topLeftIcons: { key: WindowContentType; label: string; icon: string }[] = [
    { key: 'tictactoe', label: 'TicTacToe', icon: 'assets/icons/tictactoe.png' },
    { key: 'about', label: 'Me!', icon: 'assets/icons/about_me.png' },
    { key: 'contact', label: 'Contact', icon: 'assets/icons/contact.png' },
  ];

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

      const newWindow: WindowTab = {
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

  activateWindow(windowToActivate: WindowTab): void {
    this.openWindows.forEach(win => win.active = false);
    windowToActivate.active = true;
  }

  closeWindow(windowToClose: WindowTab): void {
    this.openWindows = this.openWindows.filter(win => win.id !== windowToClose.id);
  }

  startDrag(event: MouseEvent, window: WindowTab): void {
    this.draggingWindow = window;
    this.offsetX = event.clientX - window.x;
    this.offsetY = event.clientY - window.y;
    event.preventDefault();
  }

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

  stopDrag(): void {
    this.draggingWindow = null;
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}
