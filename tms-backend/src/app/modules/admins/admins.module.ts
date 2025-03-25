import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TravelRequestsViewComponent } from './travel-requests-view/travel-requests-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewManagersComponent } from './view-managers/view-managers.component';
import { LoginComponent } from './login/login.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TravelRequestsViewComponent,
    AddUserComponent,
    ViewManagersComponent,
    LoginComponent,
    LoginHeaderComponent,
    NoteModalComponent,
    AlertModalComponent,
    ViewEmployeesComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
