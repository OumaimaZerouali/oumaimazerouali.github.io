import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactComponent} from './components/contact/contact.component';
import {LinksComponent} from './components/links/links.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'links', component: LinksComponent },

  { path: '**', redirectTo: '' }
];
