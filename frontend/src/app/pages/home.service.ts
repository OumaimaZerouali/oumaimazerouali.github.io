import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  getHomePageContent(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/home`);
  }

  getContactPageContent(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/contact`);
  }
}


