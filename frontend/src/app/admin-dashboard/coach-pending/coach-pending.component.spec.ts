import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPendingComponent } from './coach-pending.component';

describe('CoachPendingComponent', () => {
  let component: CoachPendingComponent;
  let fixture: ComponentFixture<CoachPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
