import { TestBed } from '@angular/core/testing';

import { AdminLoginGuardServiceService } from '../../admin.login.guard.service.service';

describe('AdminLoginGuardServiceService', () => {
  let service: AdminLoginGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoginGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
