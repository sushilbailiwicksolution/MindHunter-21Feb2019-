import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalmodeComponent } from './normalmode.component';

describe('NormalmodeComponent', () => {
  let component: NormalmodeComponent;
  let fixture: ComponentFixture<NormalmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
