



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';
// import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-notes-received',
  templateUrl: './notes-received.component.html',
  styleUrls: ['./notes-received.component.css']
})
export class NotesReceivedComponent implements OnInit {
  notes: any[] = [];
  requestId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.requestId) {
      this.fetchNotes(this.requestId);
    } else {
      console.error("Invalid request ID.");
    }
  }

  fetchNotes(requestId: number): void {
    this.backendService
      .request('employee', 'GET', `travel-request/notes/${requestId}`)
      .subscribe(
        (response) => {
          this.notes = response;
          console.log("Notes fetched:", this.notes);
        },
        (error) => {
          console.error("Error fetching notes:", error);
        }
      );
  }
}
