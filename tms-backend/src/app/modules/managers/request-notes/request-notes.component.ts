import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-request-notes',
  templateUrl: './request-notes.component.html',
  styleUrl: './request-notes.component.css'
})
export class RequestNotesComponent implements OnInit {
  travelRequestId!: number;
  requestNotes: any[] = [];
  errorMessage = '';

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.travelRequestId = +params['id']; // Convert to number with the + operator
      if (this.travelRequestId) {
        this.fetchRequestNotes();
      }
    });
  }

  fetchRequestNotes() {
    // Fifth parameter should be queryParams (null here), and ID should be the sixth
    this.backendService.request('manager', 'GET', `notes`, null, undefined, this.travelRequestId).subscribe(
      (response) => {
        // Handle different response formats
        this.requestNotes = Array.isArray(response) ? response : response.data || [];
      },
      (error) => {
        console.error('Error fetching request notes:', error);
        this.errorMessage = 'Failed to load request notes.';
      }
    );
  }
}
