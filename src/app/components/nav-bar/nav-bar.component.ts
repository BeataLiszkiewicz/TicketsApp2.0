import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  bookingUnavailable: boolean = false;
  clickToBook: boolean = false;

  constructor(private bookService: BookPlaneService) {}

  ngOnInit() {
    this.bookService.getHover().subscribe({
      next: (el: any) => {
        this.clickToBook = el;
      },
      error: (err: any) => console.log(err),
    });
    this.bookService.getBookingButton().subscribe({
      next: (el: any) => {
        this.bookingUnavailable = el;
      },
      error: (err: any) => console.log(err),
    });
  }

  fly(direction: string) {
    if (direction === 'on') {
      this.clickToBook = true;
      this.bookService.setHover(true);
    } else {
      this.clickToBook = false;
      this.bookService.setHover(false);
    }
  }

  bookPlane() {
    this.bookService.setFlying('start');
  }
}
