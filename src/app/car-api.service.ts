import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore"


@Injectable()
export class CarApiService {

  //private _siteURL = 'http://localhost:3000/car_data';
  carsData: Observable<ICar[]>;

  //Service wrapper around the native Firestore SDK's
  // CollectionReference and  Query types.
  carsDataCollection: AngularFirestoreCollection<ICar>;

  // Array to hold all products
  allCarsData: ICar[];

  // Holds the error message
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore){
    // Connect to the database
    this.carsDataCollection = _afs.collection<ICar>("cars_data");
    //this.addAllProducts();
  }
  getCarData(): Observable<ICar[]>{
    // valueChanged() returns the current state of the collection as
    // an Observable of data as a synchronised arrau of JSON objects
    this.carsData = this.carsDataCollection.valueChanges();

    // as the data is now available as an Observable just subscribe and the data will start to flow.
    // Also output the data to the console.
    this.carsData.subscribe(data => console.log("getCarsData: " + JSON.stringify(data)));
    return this.carsData;
  }

  addCarData(car: ICar): void{
    this.carsDataCollection.add(car);
  }

/*
  constructor(private _http: HttpClient) { }

  getCarData(): Observable<ICar[]>{
    return this._http.get<ICar[]>(this._siteURL).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log('OmdbApiService: ' + err.message);
    return Observable.throw(err.message);
  }
  

  addAllProducts(){
    this._http.get<ICar[]>(this._siteURL).subscribe(
      carsData => {
        this.allCarsData = carsData;
        for (let car of this.allCarsData){
          console.log("Adding: Make: " + car.make + "- Model: " + car.model);
          this.carsDataCollection.add(car);
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }
  */
}
