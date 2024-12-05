import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachjoinComponent } from './coachjoin.component';

describe('CoachjoinComponent', () => {
  let component: CoachjoinComponent;
  let fixture: ComponentFixture<CoachjoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachjoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
