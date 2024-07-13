import {Component, inject, OnInit} from '@angular/core';
import {HomeService} from "../home.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private readonly homeService: HomeService = inject(HomeService);
  aboutContent!: string;

  ngOnInit(): void {
    this.homeService.getContactPageContent().subscribe(
      data => this.aboutContent = data,
      error => console.error(error)
    );
  }
}
