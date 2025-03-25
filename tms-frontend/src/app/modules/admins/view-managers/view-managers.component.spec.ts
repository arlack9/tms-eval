import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagersComponent } from './view-managers.component';

describe('ViewManagersComponent', () => {
  let component: ViewManagersComponent;
  let fixture: ComponentFixture<ViewManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewManagersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
