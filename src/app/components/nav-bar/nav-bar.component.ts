import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { TicketPriceService } from 'src/app/services/ticket-price.service';
import { UsersListService } from 'src/app/services/users-list.service';
import { FlyChoiceComponent } from '../fly-choice/fly-choice.component';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  bookingUnavailable: boolean = false;
  clickToBook: boolean = false;

  constructor(private bookService: BookPlaneService,
    private ticketService:TicketPriceService,
    private dialogRef: MatDialog,
    private UserService:UsersListService) {}

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
    

    this.ticketService.createPriceList();
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

    setTimeout(()=>{
      this.bookService.setFlying('');
    }, 200)
  }

 
    openLogIn() {
      if (this.UserService.oneUser.length > 0) {
        this.dialogRef.open(FlyChoiceComponent, {
          disableClose: false,
          hasBackdrop: true,
          backdropClass: '',
          width: '90vw',
          maxWidth:'576px',
          height: '',
          position: {
            top: '',
            bottom: '',
            left: '',
            right: '',
          },
        });
       
      } else {
        this.UserService.changeOnlyLogIn(true);
        this.dialogRef.open(LogInComponent, {
          disableClose: false,
          hasBackdrop: true,
          backdropClass: '',
          width: '90vw',
          maxWidth:'576px',
          height: '',
          position: {
            top: '',
            bottom: '',
            left: '',
            right: '',
          },
        });
      }
    
  }
}
