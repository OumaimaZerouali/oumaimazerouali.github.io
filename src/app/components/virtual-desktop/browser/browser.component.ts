import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'browser',
  standalone: true,
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
  activeUrl: SafeResourceUrl;
  tabs = [
    { label: 'Blog', url: 'https://oumaimazerouali.github.io/devs-insights/' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.activeUrl = this.sanitizeUrl(this.tabs[0].url);
  }

  switchTab(url: string): void {
    this.activeUrl = this.sanitizeUrl(url);
  }

  private sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
