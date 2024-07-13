import {Component, EventEmitter, Output} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'side-nav',
  standalone: true,
  styleUrl: './side-nav.component.css',
  templateUrl: './side-nav.component.html',
  imports: [
    NgOptimizedImage
  ]
})
export class SideNavComponent {
  @Output() showMoreInfoEvent = new EventEmitter<void>();

  showMoreInfo(): void {
    this.showMoreInfoEvent.emit();
  }
}
