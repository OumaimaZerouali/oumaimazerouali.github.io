import {Component, inject, OnInit} from '@angular/core';
import {HomeService} from "../home.service";

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private readonly homeService: HomeService = inject(HomeService);
  aboutContent!: string;

  ngOnInit(): void {
    this.homeService.getAboutPageContent().subscribe(
      data => this.aboutContent = data,
      error => console.error(error)
    );
  }
}
