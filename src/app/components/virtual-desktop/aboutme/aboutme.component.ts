import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'aboutme',
  standalone: true,
  imports: [],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {
  @Output() closeRequested = new EventEmitter<void>();

  onOkClick(): void {
    this.closeRequested.emit();
  }
}
