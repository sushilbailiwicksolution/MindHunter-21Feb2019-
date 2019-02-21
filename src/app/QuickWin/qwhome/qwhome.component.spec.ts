import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwhomeComponent } from './qwhome.component';

describe('QwhomeComponent', () => {
  let component: QwhomeComponent;
  let fixture: ComponentFixture<QwhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
