import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  private marvelBase = 'http://gateway.marvel.com:80/v1/public/';
  private marvelPublicKey = 'b9ced31de3874eb2c065a5bce26f8c59';

  private googleMapsPublicKey = 'YOUR_KEY';

  constructor(private _http: HttpClient) {
  }

  /**
   * Find heroes by name
   *
   * @memberOf AppService
   * @param startsWith the starting characters of the hero name
   */
  public findHeroes = (startsWith: string): Observable<any[]> => {
    return this._http.get<any>(`${this.marvelBase}characters?nameStartsWith=${startsWith}&apikey=${this.marvelPublicKey}`);
  };

  public getMapsUrl = () => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword&key=${this.googleMapsPublicKey}`
  }
}
