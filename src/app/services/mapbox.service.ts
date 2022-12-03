import { Injectable } from '@angular/core';
import { apiKey } from '../../mapbox.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  features: Feature[];
}

export interface Feature {
  id: string;
  place_name: string;
  center: [number, number]
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  public mapboxApiKey: string = apiKey;

  constructor(private readonly httpClient: HttpClient) {
  }

  public search(q: string): Observable<Address> {
    return this.httpClient.get<Address>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ q }.json?country=sk&types=place%2Cpostcode%2Caddress&language=sk&access_token=${ this.mapboxApiKey }`);
  }
}
