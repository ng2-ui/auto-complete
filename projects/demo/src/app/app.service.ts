import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** A single book result from the Open Library search API (only the fields we request). */
export interface Book {
	title: string;
	author_name?: string[];
}

/** Open Library search response shape (`docs` is the array the autocomplete reads via `path-to-data`). */
export interface BookSearchResponse {
	docs: Book[];
}

@Injectable()
export class AppService {
	private _http = inject(HttpClient);

	/**
	 * Search books via Open Library (no API key required).
	 */
	public findBooks = (keyword: string): Observable<BookSearchResponse> => {
		const q = encodeURIComponent(keyword);
		return this._http.get<BookSearchResponse>(`https://openlibrary.org/search.json?q=${q}&fields=title,author_name&limit=8`);
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
