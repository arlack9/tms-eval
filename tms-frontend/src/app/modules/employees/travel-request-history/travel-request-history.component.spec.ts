import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestHistoryComponent } from './travel-request-history.component';

describe('TravelRequestHistoryComponent', () => {
  let component: TravelRequestHistoryComponent;
  let fixture: ComponentFixture<TravelRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelRequestHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
