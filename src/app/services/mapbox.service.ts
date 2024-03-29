import { Injectable } from '@angular/core';
import { apiKey } from '../../mapbox.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, Isochrone } from '../models';

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

  public getIsochrone([x, y]: [number, number], radius: number): Observable<Isochrone> {
    return this.httpClient.get<Isochrone>(`https://api.mapbox.com/isochrone/v1/mapbox/driving/${ x }%2C${ y }?contours_meters=${ radius }&contours_colors=54278f&polygons=true&denoise=1&generalize=500&access_token=${ this.mapboxApiKey }`);
  }
}
