import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticdashComponent } from './staticdash.component';

describe('StaticdashComponent', () => {
  let component: StaticdashComponent;
  let fixture: ComponentFixture<StaticdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaticdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaticdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
