import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TravelRequestFormComponent } from './travel-request-form/travel-request-form.component';
import { TravelRequestEditComponent } from './travel-request-edit/travel-request-edit.component';
import { NotesReceivedComponent } from './notes-received/notes-received.component';
import { userauthGuard } from '../services/auth/userauth.guard';
import { TravelRequestHistoryComponent } from './travel-request-history/travel-request-history.component';

// import { LoginComponent } from './modules/employees/login/login.component';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'new-request',component:TravelRequestFormComponent,canActivate:[userauthGuard]},
{path:'edit-request/:id',component:TravelRequestEditComponent,canActivate:[userauthGuard]},
{path:'view-notes/:id',component:NotesReceivedComponent,canActivate:[userauthGuard]},
{path:'travel-requests',component:TravelRequestHistoryComponent,canActivate:[userauthGuard]},
// {path:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }