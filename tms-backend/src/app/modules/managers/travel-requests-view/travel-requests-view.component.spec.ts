import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestsViewComponent } from './travel-requests-view.component';

describe('TravelRequestsViewComponent', () => {
  let component: TravelRequestsViewComponent;
  let fixture: ComponentFixture<TravelRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelRequestsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
