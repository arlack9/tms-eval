



import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendService } from '../../services/backend/backend.service';
import { Router } from '@angular/router';
// import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-travel-request-form',
  templateUrl: './travel-request-form.component.html',
  styleUrl: './travel-request-form.component.css',
})
export class TravelRequestFormComponent {
  constructor(private backendService: BackendService,
              private router:Router
  ) {}

  requestform: FormGroup = new FormGroup({
    from_location: new FormControl(''),
    to_location: new FormControl(''),
    preferred_travel_mode: new FormControl(''),
    lodging_required: new FormControl(''),
    lodging_location: new FormControl(''),
    additional_requests: new FormControl(''),
    travel_purpose: new FormControl(''),
    date_to: new FormControl(''),
    date_from: new FormControl(''),
  });


  submit(): void {
    const request_data = this.requestform.value;
    console.log('Submitting request data:', request_data); // Debug log
  
    this.backendService
      .request('employee', 'POST', 'travel-request/', request_data)
      .subscribe(
        (response) =>{ 
          console.log('Request created successfully', response);
          this.router.navigate(['/employees/travel-requests']);
          },
        (error) => console.error('Error in request submission', error)
      );

  }
  

}
