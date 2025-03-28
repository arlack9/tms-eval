import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-travel-requests-view',
  templateUrl: './travel-requests-view.component.html',
  styleUrls: ['./travel-requests-view.component.css'],
})
export class TravelRequestsViewComponent implements OnInit {
  travelRequests: any[] = [];
  searchText = ''; // Search input model
  isModalOpen = false;
  selectedRequestId: number | null = null;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.loadTravelRequests();
  }

  loadTravelRequests(): void {
    this.backendService.request('admin', 'GET', 'travel-request')
      .subscribe(
        (response) => {
          // Check if response is an object with 'data' property or an array directly
          this.travelRequests = Array.isArray(response) ? response : response.data || [];
        },
        (error) => console.error('Error fetching travel requests:', error)
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
      
      this.backendService.request('admin', 'POST', `travel-request/${this.selectedRequestId}/note/`, noteData)
        .subscribe(
          (response) => {
            console.log("Note successfully sent:", response);
            this.isModalOpen = false; // Close modal after sending
          },
          (error) => console.error("Error sending note:", error)
        );
    }
  }

  closeRequest(id: number): void {
    this.backendService.request('admin', 'PATCH', `travel-request/${id}/`)
      .subscribe(
        () => {
          console.log(`Request ${id} closed`);
          this.loadTravelRequests(); // Refresh the request list
        },
        (error) => console.error('Error closing request:', error)
      );
  }
}
