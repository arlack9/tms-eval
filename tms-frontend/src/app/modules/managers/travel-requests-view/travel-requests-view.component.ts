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
      
      this.backendService.request('manager', 'POST', `travel-request/${this.selectedRequestId}/`, noteData)
        .subscribe(
          (response) => {
            console.log("Note successfully sent:", response);
            this.isModalOpen = false; // Close modal after sending
          },
          (error) => console.error("Error sending note:", error)
        );
    }
  }


}
