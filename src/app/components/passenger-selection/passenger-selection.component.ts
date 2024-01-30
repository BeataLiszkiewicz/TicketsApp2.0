import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passenger-selection',
  templateUrl: './passenger-selection.component.html',
  styleUrls: ['./passenger-selection.component.scss'],
})
export class PassengerSelectionComponent {
  adults: number = 1;
  child: number = 0;
  infants: number = 0;
  passengers: any;

  constructor(
    public dialogRef: MatDialogRef<PassengerSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly passengerService: PassengerService
  ) {}

  ngOnInit() {
    this.passengers = this.passengerService.getOptionDetails('passengersTotal');

  }

  changeAdult(param: number) {
    this.adults += param;
    if (this.adults + this.child < this.infants) {
      this.infants = this.adults + this.child;
    }
  }

  changeChildren(param: number) {
    this.child += param;
    if (this.adults + this.child < this.infants) {
      this.infants = this.adults + this.child;
    }
  }

  changeInfant(param: number) {
    this.infants += param;
  }

  close(): void {
    this.dialogRef.close({
      adults: this.adults,
      children: this.child,
      infants: this.infants,
    });
  }
}
