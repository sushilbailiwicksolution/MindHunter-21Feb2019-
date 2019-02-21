import { TestBed } from '@angular/core/testing';

import { PPService } from './pp.service';

describe('PPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PPService = TestBed.get(PPService);
    expect(service).toBeTruthy();
  });
});
