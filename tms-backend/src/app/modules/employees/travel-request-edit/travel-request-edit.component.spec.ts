import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestEditComponent } from './travel-request-edit.component';

describe('TravelRequestEditComponent', () => {
  let component: TravelRequestEditComponent;
  let fixture: ComponentFixture<TravelRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelRequestEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
