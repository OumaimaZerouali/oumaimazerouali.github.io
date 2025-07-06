import {Component, EventEmitter, HostListener, Output} from '@angular/core';

type WindowContentType = 'tictactoe' | 'about' | 'contact' | 'links' | 'ie';

@Component({
  selector: 'footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  time: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  isStartMenuOpen: boolean = false;

  @Output() openWindowRequest = new EventEmitter<{ type: WindowContentType; title: string }>();
  @Output() openExternalLinkRequest = new EventEmitter<string>();

  startMenuItems = [
    { label: 'Tic Tac Toe', icon: 'assets/icons/tictactoe.png', action: 'openWindow', type: 'tictactoe' as WindowContentType },
    { label: 'Over mij', icon: 'assets/icons/about_me.png', action: 'openWindow', type: 'about' as WindowContentType },
    { label: 'Contact', icon: 'assets/icons/contact.png', action: 'openWindow', type: 'contact' as WindowContentType },
    { label: 'Browser', icon: 'assets/icons/search-engine.png', action: 'openWindow', type: 'ie' as WindowContentType },
    { label: 'JCast Podcast', icon: 'assets/icons/jcast.png', action: 'openExternal', url: 'https://jcast.dev' }
  ];

  toggleStartMenu(): void {
    this.isStartMenuOpen = !this.isStartMenuOpen;
  }

  performAction(item: any): void {
    this.isStartMenuOpen = false;
    if (item.action === 'openWindow') {
      this.openWindowRequest.emit({ type: item.type, title: item.label });
    } else if (item.action === 'openExternal') {
      this.openExternalLinkRequest.emit(item.url);
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.start-button') && !target.closest('.start-menu') && this.isStartMenuOpen) {
      this.isStartMenuOpen = false;
    }
  }
}
