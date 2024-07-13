import {Component, inject, OnInit} from '@angular/core';
import {HomeService} from "../home.service";
import {MusicComponent} from "./music/music.component";
import {SideNavComponent} from "../../shared/side-nav/side-nav.component";
import {MoreInfoComponent} from "./more-info/more-info.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MusicComponent,
    SideNavComponent,
    MoreInfoComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly homeService: HomeService = inject(HomeService)
  message!: string;
  showMoreInfo = true;


  ngOnInit(): void {
    this.homeService.getHomePageContent().subscribe(
      data => this.message = data,
      error => console.error(error)
    );
  }

  onCloseMoreInfo(): void {
    this.showMoreInfo = false;
  }

  toggleMoreInfo(): void {
    this.showMoreInfo = !this.showMoreInfo;
  }
}
