import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TravelRequestsViewComponent } from './travel-requests-view/travel-requests-view.component';

import { LoginComponent } from './login/login.component';
import { ManagersRoutingModule } from './managers-routing.module';
import { RequestNotesComponent } from './request-notes/request-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NoteModalComponent } from './note-modal/note-modal.component';



@NgModule({
  declarations: [
    LoginHeaderComponent,
    HeaderComponent,
    FooterComponent,
    TravelRequestsViewComponent,
    RequestNotesComponent,
    LoginComponent,
    AlertModalComponent,
    NoteModalComponent
  ],
  imports: [
    CommonModule,
    ManagersRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class ManagersModule { }
