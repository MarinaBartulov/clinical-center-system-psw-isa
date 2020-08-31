import { TestBed } from '@angular/core/testing';

import { ClinicalCenterAdminService } from './clinical-center-admin.service';

describe('ClinicalCenterAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClinicalCenterAdminService = TestBed.get(ClinicalCenterAdminService);
    expect(service).toBeTruthy();
  });
});
