// import { Component } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { EmployeesService } from '../../services/employees/employees.service';
// import { TravelRequestHistoryComponent } from '../travel-request-history/travel-request-history.component';


// @Component({
//   selector: 'app-travel-request-edit',
//   templateUrl: './travel-request-edit.component.html',
//   styleUrl: './travel-request-edit.component.css'
// })
// export class TravelRequestEditComponent {

//   constructor(
//     private empsvc:EmployeesService,
//     // private travelhistory:TravelRequestHistoryComponent
//     ){}
  
//     requestform:FormGroup =new FormGroup({
  
//       from_location: new FormControl(''),
//       to_location: new FormControl(''),
//       preferred_travel_mode: new FormControl(''),
//       lodging_required: new FormControl(''),
//       lodging_location: new FormControl(''),
//       additional_requests:new FormControl(''),
//       travel_purpose:new FormControl(''),
//       date_to:new FormControl(''),
//       date_from:new FormControl('')
  
      
//       })


//     public table_data:any=[]



//   ngOnit():void{
//     this.getTableData()
 
//   }

//   getTableData():any{
//     let table_data=this.empsvc.getTableData()

//   // console.log("type table data",typeof(table_data))


//   }

  
//     submit():any{
//       // console.log(this.requestform.value)
//       const request_data=this.requestform.value;

//       // cont table_data
  
//       this.empsvc.editTravelRequest(request_data).subscribe(
//         (response)=>{
//           console.log('request created successfully')
//         },
//         (error)=>{
//           console.log('error')
  
//         }
//       );
  
//     }

    

// }


// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { BackendService } from '../../services/backend/backend.service';
// // import { BackendService } from '../../services/backend.service';

// @Component({
//   selector: 'app-travel-request-edit',
//   templateUrl: './travel-request-edit.component.html',
//   styleUrl: './travel-request-edit.component.css'
// })
// export class TravelRequestEditComponent implements OnInit {
//   requestform: FormGroup = new FormGroup({
//     from_location: new FormControl(''),
//     to_location: new FormControl(''),
//     preferred_travel_mode: new FormControl(''),
//     lodging_required: new FormControl(''),
//     lodging_location: new FormControl(''),
//     additional_requests: new FormControl(''),
//     travel_purpose: new FormControl(''),
//     date_to: new FormControl(''),
//     date_from: new FormControl('')
//   });

//   public table_data: any = [];

//   constructor(private backendService: BackendService) {}

//   ngOnInit(): void {
//     this.getTableData();
//   }

//   getTableData(): void {
//     this.backendService
//       .request('employee', 'GET', 'travel-request')
//       .subscribe(
//         (response) => {
//           console.log('Travel request data:', response);
//           this.table_data = response;
//         },
//         (error) => {
//           console.error('Error fetching travel request data:', error);
//         }
//       );
//   }

//   submit(): void {
//     const request_data = this.requestform.value;
//     console.log('Submitting updated request:', request_data);

//     this.backendService
//       .request('employee', 'PUT', 'travel-request', request_data)
//       .subscribe(
//         (response) => {
//           console.log('Request updated successfully', response);
//         },
//         (error) => {
//           console.error('Error updating travel request', error);
//         }
//       );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BackendService } from '../../services/backend/backend.service';
// import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-travel-request-edit',
  templateUrl: './travel-request-edit.component.html',
  styleUrl: './travel-request-edit.component.css'
})
export class TravelRequestEditComponent implements OnInit {
  requestform: FormGroup = new FormGroup({
    id: new FormControl(''),
    from_location: new FormControl(''),
    to_location: new FormControl(''),
    preferred_travel_mode: new FormControl(''),
    lodging_required: new FormControl(''),
    lodging_location: new FormControl(''),
    additional_requests: new FormControl(''),
    travel_purpose: new FormControl(''),
    date_to: new FormControl(''),
    date_from: new FormControl('')
  });

  requestId: string | null = null; // Store the extracted request ID

  constructor(private route: ActivatedRoute,
              private backendService: BackendService
            ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id'); // Extract ID from URL
    if (this.requestId) {
      this.loadTravelRequest(this.requestId);
    } else {
      console.error('No travel request ID provided.');
    }
  }

  loadTravelRequest(id: string): void {
    this.backendService.request('employee', 'GET', `travel-request/${id}`).subscribe(
      (response) => {
        console.log('Fetched travel request:', response);
        this.requestform.patchValue(response); // Populate the form with data
      },
      (error) => {
        console.error('Error fetching travel request data:', error);
      }
    );
  }

  

  submit(): void {
    if (!this.requestId) {
      console.error('Error: No request ID provided for update.');
      return;
    }
  
    // Ensure the ID is explicitly included
    const request_data = { ...this.requestform.value, id: this.requestId };
  
    console.log('Submitting update for ID:', this.requestId, request_data);
  
    this.backendService.request('employee', 'PUT', `travel-request/${this.requestId}`, request_data).subscribe(
      (response) => {
        console.log('Request updated successfully', response);
      },
      (error) => {
        console.error('Error updating travel request', error);
      }
    );
  }
  
}
