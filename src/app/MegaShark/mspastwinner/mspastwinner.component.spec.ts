import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspastwinnerComponent } from './mspastwinner.component';

describe('MspastwinnerComponent', () => {
  let component: MspastwinnerComponent;
  let fixture: ComponentFixture<MspastwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspastwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspastwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
