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
  currentPage = 1;
  requestsPerPage = 5;
  totalPages = 1;
  sortField = 'date';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTravelRequests();
  }

  approve(id:number): void{
    ` button approve`
    this.backendService.request('manager', 'PATCH', `travel-request/${this.id}?status=approved`).subscribe(
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
    this.backendService.request('manager', 'PATCH', `travel-request/${this.id}?status=rejected`).subscribe(
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
    const queryParams = {
      // search: this.searchText,
      sort: this.sortField,
      order: this.sortOrder,
      page: this.currentPage,
      per_page: this.requestsPerPage
    };

    this.backendService.request('manager', 'GET', 'travel-request', null, queryParams).subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          // If response has a data property, use it
          this.table_data = response.data;
          this.totalPages = response.total_pages || 1;
        } else if (Array.isArray(response)) {
          // If response is an array, use it directly
          this.table_data = response;
          this.totalPages = 1;
        } else {
          // Handle other cases
          this.table_data = [];
          this.totalPages = 1;
        }
        console.log('Travel requests:', this.table_data);
      },
      (error) => {
        console.error('Error fetching travel requests:', error);
        this.table_data = [];
        this.totalPages = 1;
      }
    );
  }

  requestMoreInfo(requestId: number) {
    this.router.navigate([`/request-notes/${requestId}`]);
  }

    cancel(id=0):void{

    }
  onSearchChange() {
    this.currentPage = 1;
    this.fetchTravelRequests();
  }

  changeSorting(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.fetchTravelRequests();
  }

  totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchTravelRequests();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTravelRequests();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchTravelRequests();
    }
  }
}
