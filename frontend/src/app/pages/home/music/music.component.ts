import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {formatDate, NgClass, NgOptimizedImage} from "@angular/common";
import {Song} from "./models/song.component";

@Component({
  selector: 'music',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {
  @ViewChild('audio', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;

  currentTime: string = '';

  volProgress: number = 0;
  cpuProgress: number = 0;
  ramProgress: number = 0;

  currentSongIndex: number = 0;
  currentSong!: Song;
  isPlaying: boolean = false;
  interval: any;

  songs: Song[] = [
    { title: 'Deira - Saint Levant', img:'deira-saint-levant', duration: 180, path:'assets/audio/saint-levant.mp3'},
    { title: 'Coeur cassé - Jeune Mort', img:'coeur-casse-jeune-mort', duration: 200, path:'assets/audio/jeune-mort.mp3' },
    { title: 'AMBRAS - STIKSTOF', img:'gele-blokken-stikstof', duration: 210, path:'assets/audio/stikstof.mp3'},
  ];
  ngOnInit(): void {
    this.currentSong = this.songs[this.currentSongIndex];
    this.updateTime();
    this.updateProgressBars();

    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    this.currentTime = formatDate(new Date(), 'HH:mm', 'en-US');
  }

  updateProgressBars(): void {
    this.volProgress = Math.random() * 100;
    this.cpuProgress = Math.random() * 100;
    this.ramProgress = Math.random() * 100;
  }

  playPause(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play(): void {
    this.isPlaying = true;
    this.audioRef.nativeElement.play();
    this.interval = setInterval(() => {
      this.updateProgressBars();
    }, 1000);

    setTimeout(() => {
      this.pause();
    }, this.currentSong.duration * 1000);
  }

  pause(): void {
    this.isPlaying = false;
    this.audioRef.nativeElement.pause();
    clearInterval(this.interval);
  }

  next(): void {
    this.pause();
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.currentSong = this.songs[this.currentSongIndex];
    this.play();
  }

  prev(): void {
    this.pause();
    this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    this.currentSong = this.songs[this.currentSongIndex];
    this.play();
  }
}
