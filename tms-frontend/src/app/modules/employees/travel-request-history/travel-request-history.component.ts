// import { Component, OnInit } from '@angular/core';
// import { EmployeesService } from '../../services/employees/employees.service';
// // import {co}
// @Component({
//   selector: 'app-travel-request-history',
//   templateUrl: './travel-request-history.component.html',
//   styleUrl: './travel-request-history.component.css'
// })
// export class TravelRequestHistoryComponent implements OnInit{

//   constructor(private employeeservice:EmployeesService){}

//   public table_data:any=[]

//   ngOnInit(): void {
//     this.getTable(); // Call getTable() here
//   }
  
//   getTable(){
//   this.employeeservice.getTableData().subscribe(
//     (response)=>{
//       console.log(response)
//       this.table_data=response
//     },
//     (error)=>{

//       console.log(error)

//     }
//   );
//   }

//   cancel():void{
//   console.log('cancelled debug')
//   }


// }

// // gettab



import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';


@Component({
  selector: 'app-travel-request-history',
  templateUrl: './travel-request-history.component.html',
  styleUrl: './travel-request-history.component.css'

})
export class TravelRequestHistoryComponent implements OnInit {
  public table_data: any = [];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.getTable(); // Fetch table data on component initialization
  }

  getTable(): void {
    this.backendService
      .request('employee', 'GET', 'travel-request')
      .subscribe(
        (response) => {
          console.log('Travel request history:', response);
          this.table_data = response;
        },
        (error) => {
          console.error('Error fetching travel request history:', error);
        }
      );
  }

  // cancel(): void {
  //   this.backendService
  //   .request('employee','GET','cancel')
  //   console.log('Cancel action triggered');
  // }

  cancel(requestId: number): void {

    console.log(`Cancelling request with ID: ${requestId}`);
  
    // Define the payload (mark request as canceled)
    const cancelData = { request_status: "CN" };
  
    this.backendService
      .request('employee', 'PATCH', `travel-request/${requestId}`,cancelData)
      .subscribe(

        (response) => {

          console.log('Request canceled successfully', response);
          this.getTable(); // Refresh table after 
          
        },

        (error) => {

          console.error('Error in request cancellation', error);

        }

      );

  }
  

}
