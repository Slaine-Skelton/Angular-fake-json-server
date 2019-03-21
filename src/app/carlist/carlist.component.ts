import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../car-api.service';
import { Car } from '../../car';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
  providers: [CarApiService]
})
export class CarlistComponent implements OnInit {
  carsData: ICar[];

  constructor(private _carAPIService: CarApiService) { }

  ngOnInit() {

    this._carAPIService.getCarData().subscribe(carsData => 
      {this.carsData = carsData});
  }

  addCar(evt){
    this.carsData.push(evt);
  }

  addTheCar(make:string, model:string, year:string, imageUrl:string):boolean{
    let tempCar:ICar;
    // TODO add these to constructor quality:ICarQuality[],myReview: string and add the fields in the form
    tempCar = new Car(make,model,year,imageUrl);
    this._carAPIService.addCarData(tempCar);
    return false;
  }
}
