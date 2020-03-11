import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private marvelBase = 'http://gateway.marvel.com:80/v1/public/';
  private marvelPublicKey = 'b9ced31de3874eb2c065a5bce26f8c59';

  constructor(private http: HttpClient) {
  }

  /**
   * Find heroe by name
   *
   * @param {string} startsWith, the starting characters of the heroe name
   *
   * @memberOf AppSvc
   */
  public findHeroes = (startsWith: string): Observable<any[]> => {
    return this.http.get<any>(`${this.marvelBase}characters?nameStartsWith=${startsWith}&apikey=${this.marvelPublicKey}`);
  }
}
