import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbhomeComponent } from './cbhome.component';

describe('CbhomeComponent', () => {
  let component: CbhomeComponent;
  let fixture: ComponentFixture<CbhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
