import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class CarApiService {

  private _siteURL = 'http://localhost:3000/car_data';

  constructor(private _http: HttpClient) { }

  getCarData(): Observable<ICar[]>{
    return this._http.get<ICar>(this._siteURL)
    .do(data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log('OmdbApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}
