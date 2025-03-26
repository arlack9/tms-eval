import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.css'
})
export class ViewEmployeesComponent implements OnInit {
  public employees: any[] = [];
  public loading = false;
  public error: string | null = null;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    
    // Append query parameter directly to the endpoint
    this.backendService.request('admin', 'GET', 'users?type=employees', null)
      .subscribe(
        (response) => {
          // Debug: Log the raw response to see its structure
          // console.log('Raw API response:', response);
          
          // Process response based on format (array or object with data property)
          this.employees = Array.isArray(response) ? response : response.data || [];
          
          this.loading = false;
        },
        (error) => {
          console.error('Failed to load employees:', error);
          this.error = 'Unable to load employee data. Please try again.';
          this.loading = false;
        }
      );
  }


  deleteEmployee(id: number): void {

  }





}
