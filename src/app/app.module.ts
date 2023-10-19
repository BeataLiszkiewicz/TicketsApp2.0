import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { HoverOpacityDirective } from './directives/hover-opacity.directive';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    HoverOpacityDirective
  ],
  imports: [
    BrowserModule, 
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgImageSliderModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
