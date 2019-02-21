import { TestBed } from '@angular/core/testing';
import { SpinWheelService } from './spw.service';



describe('SpinWheelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinWheelService = TestBed.get(SpinWheelService);
    expect(service).toBeTruthy();
  });
});
