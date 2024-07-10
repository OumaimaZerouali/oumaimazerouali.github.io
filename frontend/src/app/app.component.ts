import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./pages/home.service";
import {AboutComponent} from "./pages/about/about.component";
import {NavigationComponent} from "./shared/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HomeComponent,
    AboutComponent,
    NavigationComponent
  ],
  providers: [HomeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
