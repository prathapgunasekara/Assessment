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
  addGames(game: Game): Observable<Game[]> {
    const url = `${this.baseUrl}/games`;
    return this.httpClient.post<Game[]>(url, game);
  }

  getGames(): Observable<Game[]> {
    const url = `${this.baseUrl}/games`;
    return this.httpClient.get<Game[]>(url);
  }

  editGames(changes: Game): Observable<Game[]> {
    const url = `${this.baseUrl}/games`;
    return this.httpClient.put<Game[]>(url, changes);
  }

  deleteGames(id: string): Observable<Game[]> {
    const url = `${this.baseUrl}/games/${id}`;
    return this.httpClient.delete<Game[]>(url);
  }
}
