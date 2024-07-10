import {Component, inject, OnInit} from '@angular/core';
import {HomeService} from "../home.service";
import {MusicComponent} from "./music/music.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MusicComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly homeService: HomeService = inject(HomeService)
  message!: string;

  ngOnInit(): void {
    this.homeService.getHomePageContent().subscribe(
      data => this.message = data,
      error => console.error(error)
    );
  }
}
