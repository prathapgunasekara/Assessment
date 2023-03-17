import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../games/games.component';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `https://localhost:7015`;
  }

  getGames(): Observable<Game[]> {
    const url = `${this.baseUrl}/games`;
    return this.httpClient.get<Game[]>(url);
  }
}
