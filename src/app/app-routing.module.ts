import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { DeparturesCalendarComponent } from './components/departures-calendar/departures-calendar.component';

const routes:Routes=[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'flyChoice', component:FlyChoiceComponent},
  {path:'calendar', component:DeparturesCalendarComponent}
 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], 
  exports:[RouterModule]
})
export class AppRoutingModule { }
