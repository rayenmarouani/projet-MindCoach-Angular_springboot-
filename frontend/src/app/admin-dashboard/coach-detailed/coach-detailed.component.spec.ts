import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDetailedComponent } from './coach-detailed.component';

describe('CoachDetailedComponent', () => {
  let component: CoachDetailedComponent;
  let fixture: ComponentFixture<CoachDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
