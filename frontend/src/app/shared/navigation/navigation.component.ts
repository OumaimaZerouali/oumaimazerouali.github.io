import {Component, inject, OnInit} from "@angular/core";
import {formatDate, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  private readonly router: Router = inject(Router);

  currentUrl: string = '';
  currentDate: string = '';


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });

    this.updateDate();
    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  updateDate(): void {
    this.currentDate = formatDate(new Date(), 'EEE MMM d HH:mm:ss', 'en-US');
  }
}
