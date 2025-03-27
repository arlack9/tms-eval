import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { BackendService } from '../../services/backend/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-request-form',
  templateUrl: './travel-request-form.component.html',
  styleUrl: './travel-request-form.component.css',
})
export class TravelRequestFormComponent {
  constructor(private backendService: BackendService,
              private router: Router
  ) {}

  requestform: FormGroup = new FormGroup({
    from_location: new FormControl('', [Validators.required]),
    to_location: new FormControl('', [Validators.required]),
    preferred_travel_mode: new FormControl('', [Validators.required]),
    lodging_required: new FormControl('', [Validators.required]),
    lodging_location: new FormControl(''),
    additional_requests: new FormControl(''),
    travel_purpose: new FormControl('', [Validators.required]),
    date_to: new FormControl('', [Validators.required]),
    date_from: new FormControl('', [Validators.required]),
  });
 
  get lodging_required() { return this.requestform.get('lodging_required'); }

  submit(): void {
    if (this.requestform.invalid) {
      // Mark form controls as touched to show validation errors
      Object.keys(this.requestform.controls).forEach(key => {
        this.requestform.get(key)?.markAsTouched();
      });
      return;
    }

    // Create a copy of the form data to modify
    const request_data = {...this.requestform.value};
    
    // Convert lodging_required from string to number
    if (request_data.lodging_required) {
      request_data.lodging_required = parseInt(request_data.lodging_required, 10);
    }
    
    // If lodging is not required, ensure lodging_location is empty
    if (request_data.lodging_required === 0) {
      request_data.lodging_location = '';
    }
    
    console.log('Submitting request data:', request_data); // Debug log
  
    this.backendService
      .request('employee', 'POST', 'travel-request/', request_data)
      .subscribe(
        (response) => { 
          console.log('Request created successfully', response);
          this.router.navigate(['/employees/travel-requests']);
        },
        (error) => console.error('Error in request submission', error)
      );
  }
}
