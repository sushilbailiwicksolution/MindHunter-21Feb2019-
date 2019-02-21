import { TestBed } from '@angular/core/testing';

import { CashblastService } from './cashblast.service';

describe('CashblastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashblastService = TestBed.get(CashblastService);
    expect(service).toBeTruthy();
  });
});
