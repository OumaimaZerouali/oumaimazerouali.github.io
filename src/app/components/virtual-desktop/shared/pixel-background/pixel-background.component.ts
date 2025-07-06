import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'pixel-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pixel-background.component.html',
  styleUrls: ['./pixel-background.component.scss']
})
export class PixelBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pixelCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId: number = 0;
  private pixels: { x: number; y: number; size: number; color: string; speed: number }[] = [];
  private numPixels: number = 200;
  private pixelColors: string[] = ['#ADD8E6', '#90EE90', '#FFD700', '#FF6347', '#DDA0DD'];
  private maxPixelSize: number = 2;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ctx = this.canvasRef.nativeElement.getContext('2d');
      if (this.ctx) {
        this.resizeCanvas();
        this.initPixels();
        this.animatePixels();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationFrameId);
      window.removeEventListener('resize', this.resizeCanvas.bind(this));
    }
  }

  private resizeCanvas(): void {
    if (isPlatformBrowser(this.platformId) && this.canvasRef && this.ctx) {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;
      this.initPixels();
    }
  }

  private initPixels(): void {
    this.pixels = [];
    if (isPlatformBrowser(this.platformId) && this.canvasRef) {
      for (let i = 0; i < this.numPixels; i++) {
        this.pixels.push(this.createPixel());
      }
    }
  }

  private createPixel(): { x: number; y: number; size: number; color: string; speed: number } {
    if (!isPlatformBrowser(this.platformId) || !this.canvasRef) {
      return { x: 0, y: 0, size: 0, color: '#000000', speed: 0 };
    }
    return {
      x: Math.random() * this.canvasRef.nativeElement.width,
      y: Math.random() * this.canvasRef.nativeElement.height,
      size: Math.random() * this.maxPixelSize + 1,
      color: this.pixelColors[Math.floor(Math.random() * this.pixelColors.length)],
      speed: Math.random() * 0.5 + 0.1
    };
  }

  private animatePixels = (): void => {
    if (!isPlatformBrowser(this.platformId) || !this.ctx || !this.canvasRef) return;

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    for (let i = 0; i < this.pixels.length; i++) {
      const p = this.pixels[i];

      p.y += p.speed;

      if (p.y > this.canvasRef.nativeElement.height + p.size) {
        this.pixels[i] = this.createPixel();
        this.pixels[i].y = -this.pixels[i].size;
      }

      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    this.animationFrameId = requestAnimationFrame(this.animatePixels);
  }
}
