import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { TravelRequestsViewComponent } from './travel-requests-view/travel-requests-view.component';
import { RequestNotesComponent } from './request-notes/request-notes.component';
import { userauthGuard } from '../services/auth/userauth.guard';



const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'travel-requests',component:TravelRequestsViewComponent,canActivate:[userauthGuard]},
{path:'request-notes/:id',component:RequestNotesComponent,canActivate:[userauthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }