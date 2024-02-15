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
import { LogOutComponent } from './components/log-out/log-out.component';
import { userAuthGuard } from './guards/user-auth.guard';


const routes:Routes=[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'flyChoice', component:FlyChoiceComponent},
  {path:'calendar', component:DeparturesCalendarComponent},
  {path:'summary', component:SummaryComponent, canActivate:[userAuthGuard]},
  {path:'plane', component:PlaneSeatsComponent},
  {path:'user', component:CreateUserComponent},
  {path:'login', component:LogInComponent},
  {path:'logout', component:LogOutComponent}
 
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
