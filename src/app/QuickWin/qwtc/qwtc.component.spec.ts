import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwtcComponent } from './qwtc.component';

describe('QwtcComponent', () => {
  let component: QwtcComponent;
  let fixture: ComponentFixture<QwtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
