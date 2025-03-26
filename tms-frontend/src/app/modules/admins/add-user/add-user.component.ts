import { Component } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  public loading = false;
  public error: string | null = null;

  constructor(private backendService: BackendService) {}

  get name() { return this.cred.get('username')?.value || ''; }
  get password() { return this.cred.get('password')?.value || ''; }

  fetchEmployees(): void {
    this.loading = true;
    
    // Append query parameter directly to the endpoint
    this.backendService.request('admin', 'GET', 'users?type=employees')
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




}
