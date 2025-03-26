import { Component } from '@angular/core';

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrl: './view-managers.component.css'
})
export class ViewManagersComponent {
  public managers:any=[];



  deleteManager(managerId: number) {
  }
}
