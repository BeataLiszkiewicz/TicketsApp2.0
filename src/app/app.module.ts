import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { HoverOpacityDirective } from './directives/hover-opacity.directive';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DeparturesCalendarComponent } from './components/departures-calendar/departures-calendar.component';
import { CalendarCurrencyPipe } from './pipes/calendar-currency.pipe';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { PassengerSelectionComponent } from './components/passenger-selection/passenger-selection.component';
import { SummaryComponent } from './components/summary/summary.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PlaneSeatsComponent } from './components/plane-seats/plane-seats.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LettersSizeDirective } from './directives/letters-size.directive';
import { ContainNumberDirective } from './directives/contain-number.directive';
import { SpecialCharacterDirective } from './directives/special-character.directive'



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    HoverOpacityDirective,
    FlyChoiceComponent,
    SpinnerComponent,
    DeparturesCalendarComponent,
    CalendarCurrencyPipe,
    MonthNamePipe,
    PassengerSelectionComponent,
    SummaryComponent,
    PlaneSeatsComponent,
    CreateUserComponent,
    LettersSizeDirective,
    ContainNumberDirective,
    SpecialCharacterDirective
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgImageSliderModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {},
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
