import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrl: './view-managers.component.css'
})
export class ViewManagersComponent implements OnInit {
  public managers: any[] = [];
  public loading = false;
  public error: string | null = null;


  constructor(private backendService: BackendService) {}

  
 

  ngOnInit(): void {
    this.fetchManagers();
  }

  fetchManagers(): void {
    this.loading = true;
    
    // Append query parameter directly to the endpoint
    this.backendService.request('admin', 'GET', 'users?type=managers', null)
      .subscribe(
        (response) => {
          // Debug: Log the raw response to see its structure
          // console.log('Raw API response:', response);
          
          // Process response based on format (array or object with data property)
          this.managers = Array.isArray(response) ? response : response.data || [];
          
          this.loading = false;
        },
        (error) => {
          console.error('Failed to load employees:', error);
          this.error = 'Unable to load employee data. Please try again.';
          this.loading = false;
        }
      );
  }

  deleteManager(managerId: number) {
  }
}
