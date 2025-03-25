import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesModule } from './modules/employees/employees.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ManagersModule } from './modules/managers/managers.module';
// import { LoginComponent } from './modules/employees/login/login.component';

const routes: Routes = [

//lazy-loading moduless
  { path: 'employees', loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule) },
  { path:'admins', loadChildren: () => import('./modules/admins/admins.module').then(m=>m.AdminsModule)},
  { path:'managers',loadChildren: () => import('./modules/managers/managers.module').then(m=>m.ManagersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
