import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesReceivedComponent } from './notes-received.component';

describe('NotesReceivedComponent', () => {
  let component: NotesReceivedComponent;
  let fixture: ComponentFixture<NotesReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
