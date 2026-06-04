import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private _http = inject(HttpClient);


  /**
   * Search books via Open Library (no API key required).
   * Response shape: { docs: [{ title, author_name[] }] }
   */
  public findBooks = (keyword: string): Observable<any> => {
    const q = encodeURIComponent(keyword);
    return this._http.get<any>(
      `https://openlibrary.org/search.json?q=${q}&fields=title,author_name&limit=8`
    );
  };

  /**
   * Address search via Nominatim / OpenStreetMap (no API key required).
   * URL string source — replace :my_own_keyword with the typed text.
   * Response is a plain array; each item has a `display_name` field.
   */
  public getAddressUrl = () => {
    return 'https://nominatim.openstreetmap.org/search?q=:my_own_keyword&format=json&addressdetails=0&limit=8';
  };
}
