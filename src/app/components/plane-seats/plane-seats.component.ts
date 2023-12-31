import { Component } from '@angular/core';
import FlyDistance from '../../../assets/data/flyDistance.json';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';
import { PlaneService } from 'src/app/services/plane.service';

@Component({
  selector: 'app-plane-seats',
  templateUrl: './plane-seats.component.html',
  styleUrls: ['./plane-seats.component.scss'],
})
export class PlaneSeatsComponent {
  arrival!: string;
  distance!: any;
  flyDistance!: any;

  constructor(
    private readonly passengerService: PassengerService,
    private planeService:PlaneService,
    private router: Router
  ) {}

  ngOnInit() {
    this.arrival = this.passengerService.getOptionDetails('to');
    this.flyDistance = FlyDistance;

    if (this.arrival) {
      this.distance = this.flyDistance[0][this.arrival];
    }
  }
}
