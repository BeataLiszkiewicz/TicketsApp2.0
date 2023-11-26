import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(private bookService: BookPlaneService){}

  ngOnInit(){
    this.bookService.setBookingButton(true);
  }
}
