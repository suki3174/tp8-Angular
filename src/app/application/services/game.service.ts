import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Observable } from 'rxjs';
const url="http://localhost:3000/games";
@Injectable({
  providedIn: 'root'
})
export class GameService {
   private readonly http:HttpClient=inject(HttpClient);

  getGames():Observable<Game[]>{
    return this.http.get<Game[]>(url);
  }
  addGame(g:Game):Observable<Game>{
    return this.http.post<Game>(url,g);
  }

}
