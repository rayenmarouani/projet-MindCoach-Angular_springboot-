import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDetaliledComponent } from './pending-detaliled.component';

describe('PendingDetaliledComponent', () => {
  let component: PendingDetaliledComponent;
  let fixture: ComponentFixture<PendingDetaliledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingDetaliledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingDetaliledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
