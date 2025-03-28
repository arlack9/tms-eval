import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-travel-requests-view',
  templateUrl: './travel-requests-view.component.html',
  styleUrl: './travel-requests-view.component.css'
})
export class TravelRequestsViewComponent implements OnInit {
  table_data: any[] = [];
  public id :number = 0;
  // response:string='';
  // searchText = '';
  // currentPage = 1;
  // requestsPerPage = 5;
  // totalPages = 1;
  // sortField = 'date';
  // sortOrder: 'asc' | 'desc' = 'asc';

  ////
  searchText = ''; // Search input model
  isModalOpen = false;
  selectedRequestId: number | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTravelRequests();
  }

  approve(id:number): void{
    ` button approve`
    this.backendService.request('manager', 'PATCH', `travel-request/${this.id}/?status=approved`,{}).subscribe(
      (response:any) => {
        console.log('Approve response:', response);
        this.fetchTravelRequests();
      },
      (error) => {
        console.error('Error approving travel request:', error);
      }     
    );
  }

  reject(id:number): void{
    ` button reject`
    this.backendService.request('manager', 'PATCH', `travel-request/${this.id}/?status=rejected`,{}).subscribe(
      (response: any) => {
        console.log('Reject response:', response);
        this.fetchTravelRequests();
      },
      (error) => {
        console.error('Error rejecting travel request:', error);
      }
    );
  }

  fetchTravelRequests() {


    this.backendService.request('manager', 'GET', 'travel-request', null).subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response ) {
    
          this.table_data = response;
     
    
        } else {
          this.table_data = [];
        }
        console.log('Travel requests:', this.table_data);
      },
      (error) => {
        console.error('Error fetching travel requests:', error);
        this.table_data = [];
      }
    );
  }



  openModal(requestId: number): void {
    this.selectedRequestId = requestId;
    this.isModalOpen = true;
  }

  sendNote(message: string): void {
    if (this.selectedRequestId !== null) {
      const noteData = { 
        note_text: message,  // Ensure the correct field name
      };
      console.log("Sending note data:", noteData);
      
      this.backendService.request('manager', 'POST', `travel-request/${this.selectedRequestId}/note/`, noteData)
        .subscribe(
          (response) => {
            console.log("Note successfully sent:", response);
            this.isModalOpen = false; // Close modal after sending
          },
          (error) => console.error("Error sending note:", error)
        );
    }
  }

  // closeRequest(id: number): void {
  //   this.backendService.request('admin', 'PATCH', `travel-request/${id}/`)
  //     .subscribe(
  //       () => {
  //         console.log(`Request ${id} closed`);
  //         this.fetchTravelRequests(); // Refresh the request list
  //       },
  //       (error) => console.error('Error closing request:', error)
  //     );
  // }

  //   cancel(id=0):void{

  //   }
  // onSearchChange() {
  //   this.currentPage = 1;
  //   this.fetchTravelRequests();
  // }

  // changeSorting(field: string) {
  //   if (this.sortField === field) {
  //     this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortField = field;
  //     this.sortOrder = 'asc';
  //   }
  //   this.fetchTravelRequests();
  // }

  // totalPagesArray() {
  //   return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  // }

  // goToPage(page: number) {
  //   this.currentPage = page;
  //   this.fetchTravelRequests();
  // }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.fetchTravelRequests();
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.fetchTravelRequests();
  //   }
  // }
}
