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
  searchText = '';
  currentPage = 1;
  requestsPerPage = 5;
  totalPages = 1;
  sortField = 'date';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTravelRequests();
  }

  fetchTravelRequests() {
    const queryParams = {
      search: this.searchText,
      sort: this.sortField,
      order: this.sortOrder,
      page: this.currentPage,
      per_page: this.requestsPerPage
    };

    this.backendService.request('manager', 'GET', 'travel-request', null, queryParams).subscribe(
      (response: { data: any[]; total_pages: number }) => {
        this.table_data = response.data;
        this.totalPages = response.total_pages;
      },
      (error) => {
        console.error('Error fetching travel requests:', error);
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
