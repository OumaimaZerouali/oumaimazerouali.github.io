import {Routes} from '@angular/router';
import {BrowserComponent} from './browser/browser.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {ContactComponent} from './contact/contact.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {LogoutComponent} from './logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    component: BrowserComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'preferences', component: PreferencesComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
