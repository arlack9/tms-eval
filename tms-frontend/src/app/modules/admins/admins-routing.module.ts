import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TravelRequestsViewComponent } from './travel-requests-view/travel-requests-view.component';
import { ViewManagersComponent } from './view-managers/view-managers.component';
import { userauthGuard } from '../services/auth/userauth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';



// import { LoginComponent } from './modules/employees/login/login.component';

const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'view-travel-requests',component:TravelRequestsViewComponent,canActivate:[userauthGuard]},
    {path:'add-user',component:AddUserComponent,canActivate:[userauthGuard]},
    {path:'view-employees',component:ViewEmployeesComponent,canActivate:[userauthGuard]},
    {path:'view-managers',component:ViewManagersComponent,canActivate:[userauthGuard]}
    // {path:'view-travel-requests',component:TravelRequestsViewComponent},
    // {path:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }