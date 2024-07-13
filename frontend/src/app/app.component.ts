import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./pages/home.service";
import {ContactComponent} from "./pages/about/contact.component";
import {NavigationComponent} from "./shared/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HomeComponent,
    ContactComponent,
    NavigationComponent
  ],
  providers: [HomeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
