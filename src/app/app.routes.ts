import {Routes} from '@angular/router';
import {VirtualDesktopComponent} from './components/virtual-desktop/virtual-desktop.component';

export const routes: Routes = [
  { path: '', component: VirtualDesktopComponent },

  { path: '**', redirectTo: '' }
];
