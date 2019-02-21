import { TestBed } from '@angular/core/testing';

import { QwserviceService } from './qwservice.service';

describe('QwserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QwserviceService = TestBed.get(QwserviceService);
    expect(service).toBeTruthy();
  });
});
