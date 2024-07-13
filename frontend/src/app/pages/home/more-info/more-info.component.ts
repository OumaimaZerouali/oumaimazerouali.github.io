import {Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'more-info',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('draggableCard', { static: true }) draggableCard!: ElementRef;

  isDragging = false;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;

  close(event: MouseEvent): void {
    event.stopPropagation();
    this.closeEvent.emit();
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX - this.initialX;
    this.startY = event.clientY - this.initialY;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.initialX = event.clientX - this.startX;
      this.initialY = event.clientY - this.startY;
      this.draggableCard.nativeElement.style.transform = `translate(${this.initialX}px, ${this.initialY}px)`;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}
