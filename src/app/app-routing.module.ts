import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { DeparturesCalendarComponent } from './components/departures-calendar/departures-calendar.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PlaneSeatsComponent } from './components/plane-seats/plane-seats.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LogInComponent } from './components/log-in/log-in.component';

const routes:Routes=[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'flyChoice', component:FlyChoiceComponent},
  {path:'calendar', component:DeparturesCalendarComponent},
  {path:'summary', component:SummaryComponent},
  {path:'plane', component:PlaneSeatsComponent},
  {path:'user', component:CreateUserComponent},
  {path:'login', component:LogInComponent}
 
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
