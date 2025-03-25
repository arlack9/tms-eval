import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TravelRequestHistoryComponent } from './travel-request-history/travel-request-history.component';
import { LoginComponent } from './login/login.component';
import { TravelRequestEditComponent } from './travel-request-edit/travel-request-edit.component';
import { TravelRequestFormComponent } from './travel-request-form/travel-request-form.component';
import { NotesReceivedComponent } from './notes-received/notes-received.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TravelRequestHistoryComponent,
    LoginComponent,
    TravelRequestEditComponent,
    TravelRequestFormComponent,
    NotesReceivedComponent,
    LoginHeaderComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
