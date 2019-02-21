import { TestBed } from '@angular/core/testing';

import { MsserviceService } from './msservice.service';

describe('MsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsserviceService = TestBed.get(MsserviceService);
    expect(service).toBeTruthy();
  });
});
